import GettersSetters from "./getters_setters";
import Store from "./store";
import { applyMixins } from "../mixins";

class PublicController {
  store = Store;
}

interface PublicController extends GettersSetters {
};

applyMixins(PublicController, [GettersSetters]);

export { PublicController };

const class_mounted = new PublicController();

export default class_mounted;
