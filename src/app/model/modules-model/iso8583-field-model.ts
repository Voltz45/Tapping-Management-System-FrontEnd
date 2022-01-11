import {Iso8583DialectMsgTemplateModel} from "./iso8583-dialect-msg-template.model";

export class Iso8583Model {
  id: number = 0;
  dialectTemplate!: Iso8583DialectMsgTemplateModel;
  iso8583Field!: Iso8583FieldModel[];
}

export class Iso8583FieldModel {
  fieldId: string = '';
  fieldFormat: string = '';
  length: string = '';
  description: string = '';
  userInput: string = '';
  hasChild: string = '';
  typeChild: string = '';
  subField!: Iso8583SubFieldModel[];
  taggedField!: Iso8583TaggedFieldModel[];
}

export class Iso8583SubFieldModel {
  fieldId: string = '';
  fieldFormat: string = '';
  length: string = '';
  description: string = '';
}

export class Iso8583TaggedFieldModel {
  fieldId: string = '';
  fieldFormat: string = '';
  tagLenSize: string = '';
}
