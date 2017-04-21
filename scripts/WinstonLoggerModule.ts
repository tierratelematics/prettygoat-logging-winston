import { interfaces } from "inversify";
import { IModule, IProjectionRegistry, IServiceLocator, ILogger } from "prettygoat";
import WinstonLogger from "./logger/WinstonLogger";

class WinstonLoggerModule implements IModule {
    modules = (container: interfaces.Container) => {
        container.unbind("ILogger");
        container.bind<ILogger>("ILogger").to(WinstonLogger).inSingletonScope();
    }

    register(registry: IProjectionRegistry, serviceLocator?: IServiceLocator, overrides?: any): void { }
}

export default WinstonLoggerModule;
