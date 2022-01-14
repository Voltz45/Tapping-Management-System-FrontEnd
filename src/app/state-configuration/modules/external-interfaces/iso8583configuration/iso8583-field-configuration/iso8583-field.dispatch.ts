import {Injectable} from "@angular/core";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {
  ISO8583FieldAdd,
  ISO8583FieldDelete,
  ISO8583FieldGet,
  ISO8583FieldGetDialect,
  ISO8583FieldUpdate
} from "./iso8583-field.action";
import {Iso8583Model} from "../../../../../model/modules-model/iso8583-field-model";

@Injectable({
  providedIn: 'root'
})
export class ISO8583FieldDispatch {

  @Dispatch()
  public _ISO8583FieldGet() {
    return new ISO8583FieldGet();
  }

  @Dispatch()
  public _ISO8583FieldGetDialect() {
    return new ISO8583FieldGetDialect();
  }

  @Dispatch()
  public _ISO8583FieldAdd(dialectId: number, payload: Iso8583Model) {
    return new ISO8583FieldAdd(dialectId, payload);
  }

  @Dispatch()
  public _ISO8583FieldUpdate() {
    return new ISO8583FieldUpdate();
  }

  @Dispatch()
  public _ISO8583FieldDelete() {
    return new ISO8583FieldDelete();
  }
}
