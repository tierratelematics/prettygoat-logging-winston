import "reflect-metadata";
import * as TypeMoq from "typemoq";
import { LogLevel } from "prettygoat";
import { LoggerInstance } from "winston";
import expect = require("expect.js");
import WinstonLogger from "../scripts/WinstonLogger";
import MockLoggerInstance from "./fixtures/MockLoggerInstance";

describe("Given a WinstonLogger", () => {

    let subject: WinstonLogger;
    let logger: TypeMoq.IMock<LoggerInstance>;

    beforeEach(() => {
        logger = TypeMoq.Mock.ofInstance<LoggerInstance>(new MockLoggerInstance());
        logger.setup(l => l.log(TypeMoq.It.isAnyString(), TypeMoq.It.isAnyString(), TypeMoq.It.isAny())).returns(() => null);
        subject = new WinstonLogger(logger.object);
    });

    context("when asked to log a message", () => {
        it("should request the wiston logger to log with the defined level", () => {
            subject.debug("A debug Message");
            logger.verify(l => l.log("debug", "A debug Message"), TypeMoq.Times.once());
            subject.info("An info Message");
            logger.verify(l => l.log("info", "An info Message"), TypeMoq.Times.once());
            subject.warning("A warning Message");
            logger.verify(l => l.log("warning", "A warning Message"), TypeMoq.Times.once());
            subject.error("An error Message");
            logger.verify(l => l.log("error", "An error Message"), TypeMoq.Times.once());
        });
    });

    context("when a valid log level is set", () => {
        it("should set the correct log level into winston logger", () => {
            subject.setLogLevel(LogLevel.Info);
            expect(subject.getLogLevel()).to.be(LogLevel.Info);
        });
    });

    context("when an invalid log level is set", () => {
        it("should set the 'DEBUG' log level", () => {
            subject.setLogLevel(-1);
            expect(subject.getLogLevel()).to.be(LogLevel.Debug);
        });
    });
});
