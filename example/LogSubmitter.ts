import {Injectable} from "@angular/core"
import {UserService} from "../UserService"
import {Platform} from "ionic-angular"
import {AppVersion} from "@ionic-native/app-version"
import {IUser} from "./data-model"
import {Log, LogLevel} from "ng-log"
import {environment} from "environment"

declare var cordova: any

@Injectable()
export class LogSubmitter {

    static readonly MAX_RECENT = 30
    static readonly MIN_TIME_DELAY = 10 * 1000

    // Lots of Log instances will be created from withContext() so keep all the state static

    recent: string[] = []

    lastSubmitTime: number = 0

    // The static part of the HTTP POST data
    staticData: string
    logURL: string
    // A concatenated string of all the platforms which are true for Platform.get()
    platforms: string = ''

    constructor(private platform: Platform,
                private userService: UserService,
                private appVersion: AppVersion,
                private log: Log,
                appVersionPlugin: AppVersion) {
        this.log = log.withContext(LogSubmitter.name)
        this.logURL = environment.serverUrl + '/client-log'
        console.log('Configured error logger URL to ' + this.logURL)

        // Build a comma separated list of the platforms
        this.platform.platforms().forEach(platformName => {
            if (this.platforms.length !== 0)
                this.platforms += ','
            this.platforms += platformName
        })

        Log.$logEntry.subscribe(logEntry => {
            this.updateRecent(logEntry.message)
            if(logEntry.level == LogLevel.ERROR)
                this.submitLogs()
        })

        if(platform.is('cordova') && typeof cordova.getAppVersion !== 'undefined') {
            appVersionPlugin.getVersionCode().then(
                version => this.appVersion = version,
                error => {
                    version = 'N/A'
                    this.log.warn('Couldn\'t get app version', error)
                }
            )
        }
    }


    // Update the list of recent log messages
    private updateRecent(logMessage: string) {
        try {
            if (logMessage) {
                this.recent.unshift(logMessage)
                if (this.recent.length > LogSubmitter.MAX_RECENT)
                    this.recent.pop()
            }
        } catch (e) {
            console.error('Log.updateRecent', e)
        }
    }

    async submitLogs() {
        try {
            if (!this.staticData) {
                this.staticData = '&appVersion=' + this.version
                    + '&platform=' + encodeURIComponent(this.platforms)
                    + '&platformVersion=' + encodeURIComponent('' + this.platform.version().str)
            }

            const currentUser: IUser = this.userService.currentUser()
            var userId: string | null = currentUser ? currentUser.id : null
            var errorMessage: string = this.recent[0]

            // Don't submit the same error twice in a row, and also have a minimum delay before
            // sending any next error to avoid spamming the logs
            if (Date.now() > (this.lastSubmitTime + LogSubmitter.MIN_TIME_DELAY)) {

                var xmlHttp = new XMLHttpRequest()
                xmlHttp.open('POST', this.logURL, true)
                xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                var data = 'userId=' + (userId ? encodeURIComponent(userId) : 'null')
                    + '&message=' + encodeURIComponent(errorMessage)
                    + '&recent=' + encodeURIComponent(JSON.stringify(this.recent))
                    + this.staticData

                this.lastSubmitTime = Date.now()
                xmlHttp.send(data)
            }
        } catch (e) {
            console.log('Error submitting error log to server:' + e)
        }
    }

}
