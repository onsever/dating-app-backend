import dotenv from 'dotenv';
import Application from "@configurations/application";

dotenv.config({});

const application: Application = new Application();
application.initialize();