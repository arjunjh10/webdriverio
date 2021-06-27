import { World, setWorldConstructor } from '@cucumber/cucumber';
export class ScenarioContext extends World {
    [key: string]: any;
    constructor(options: World) {
        super(options);
    }    
}
setWorldConstructor(ScenarioContext);