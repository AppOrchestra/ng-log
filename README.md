# [ng-log](https://github.com/AppOrchestra/ng-log)

ng-log is a simple Log class for Angular which wraps the console log methods, and write

### Installation
```
npm install ng-log --save
```
or
```
yarn add ng-log
```

### Basic Usage

The basic usage will log to the console.

```typescript
export class SomeComponent {
    constructor(private log: Log) {
        this.log = log.withContext(SomeComponent.name)
    }

    public doTheThing() {
       this.log.log('Doing the thing')
    }
}

### Advanced usages

In a production app you may want to turn off logging to the console. In particular for our Ionic/Cordova mobile apps the system browser logs aren't going to be seen by anyone so the logging can be disabled.

```typescript
class MyApp {

    initializeApp() {
        this.platform.ready().then(() => {
            if(this.env.isProduction()) {
                Log.logToConsole = false
            }
        })
    }

}
```

The most important use case for using this Log class is being able to subscribe to the static *$logEntry* observable
so you can perform some more interesting actions with the log messages.

For example you may keep a history of the last 30 log messages, and on an error log message, post that with the history to your server.