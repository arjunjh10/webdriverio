/**
 * Class that runs in the scenario lifecycle to ensure passing of info
 * between the step files and also within the file.
 */

export class ScenarioContext {
  private static instance: ScenarioContext;
  private static instantiating = false;
  public static getInstance(): ScenarioContext {
    if (!ScenarioContext.instance) {
      ScenarioContext.instantiating = true;
      ScenarioContext.instance = new ScenarioContext();
      ScenarioContext.instantiating = false;

    }
    return ScenarioContext.instance;
  }
  [key: string]: any;
}