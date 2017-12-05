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

The basic usage will be to construct a Log instance, passing an argument which is a context value that
will be prepended to each log message.

```typescript
export class SomeComponent {

    private log: Log = new Log(SomeComponent.name)

    constructor() {}

    public doTheThing() {
       this.log.log('Doing the thing')
    }
}
```

The Log class has the @Injectable annotation, so you can also add it in your constructor if you added it in your app module providers.
```typescript
export class SomeComponent {

    constructor(private log: Log) {
        this.log = log.withContext(SomeComponent.name)
    }

    public doTheThing() {
       this.log.log('Doing the thing')
    }
}
```

Note that if you use *SomeComponent.name* as the context then that will probably get mangled to the minified class name.
If you have console logging enabled in production and want the proper name with a prod optimised build then you will need
to use a string instead of a *.name* reference.


### Advanced usages

In a production app you may want to turn off logging to the console. In particular for our Ionic/Cordova mobile apps the system browser logs aren't going to be seen by anyone so the logging can be disabled.

```typescript
class MyApp {

    initializeApp() {
        this.platform.ready().then(() => {
            if(environment.isProduction()) {
                Log.logToConsole = false
            }
        })
    }

}
```

All log messages logged will added to the static Observable property **$logEntry**

An important use case for using this Log class is being able to subscribe to the **$logEntry** observable so you can
perform more interesting actions, such as posting error messages to your server for error reporting.

An example LogSubmitter is included in the /example folder which submits error messages, along with the recent
log message history, and other information such as the userId, code version and platform version.
