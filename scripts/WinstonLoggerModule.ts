import { interfaces } from "inversify";
import { IModule, IProjectionRegistry, IServiceLocator, ILogger } from "prettygoat";
import WinstonLogger from "./WinstonLogger";

class WinstonLoggerModule implements IModule {
    modules = (container: interfaces.Container) => {
        if (container.isBound("ILogger"))
            container.unbind("ILogger");
        container.bind<ILogger>("ILogger").to(WinstonLogger).inSingletonScope();
    };

    register(registry: IProjectionRegistry, serviceLocator?: IServiceLocator, overrides?: any): void { }
}

export default WinstonLoggerModule;
