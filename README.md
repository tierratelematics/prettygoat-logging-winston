# prettygoat-logging-winston
 A winston logger adapter for [prettygoat](https://github.com/tierratelematics/prettygoat).

## Installation

`
$ npm install prettygoat-logging-winston
`

Add this code to the boostrapper.
```typescript
import {WinstonLoggerModule} from "prettygoat-logging-winston";

app.register(new WinstonLoggerModule())
```

And bind a winston instance in a module.

```typescript
import {Logger, LoggerInstance} from "winston"

container.bind<LoggerInstance>("LoggerInstance").toConstantValue(new Logger())
```

## Usage

Inject an `ILogger` instance to a class. 

```typescript
import {inject} from "inversify";

class Example {
    constructor(@inject("ILogger") private logger: ILogger) {};

    [...]
}
```
And use the logger in a class method.

```typescript
    [...]

    public test() {
        try {
            // do something
            this.logger.debug("A debug message");
        } catch(err: Error) {
            this.logger.error(err);            
        }
    }

    [...]
```
 

## License

Copyright 2016 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.