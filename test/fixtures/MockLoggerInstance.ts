import { LogMethod } from "winston";

class MockLoggerInstance {
    public level: string;
    public log: LogMethod = (level: string, msg: string) => null;
}
export default MockLoggerInstance;
