/* eslint-disable no-console */
import { registerApplication, start } from "single-spa";
import { EventBusService } from "./event-bus/event-bus.service";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

const routes = constructRoutes(
  document.querySelector("#single-spa-layout") as HTMLTemplateElement
);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

const eventBus = new EventBusService();
applications.forEach((application) => {
  application.customProps = { EventBus: eventBus };
});
console.log(applications);
applications.forEach(registerApplication);
layoutEngine.activate();
start();
