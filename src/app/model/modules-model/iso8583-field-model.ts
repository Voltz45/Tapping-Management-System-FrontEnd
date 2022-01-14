export class Iso8583Model {
  dialectFields!: Iso8583FieldModel[];
}

export class Iso8583FieldModel {
  fieldId: string = '';
  fieldFormat: string = '';
  length: string = '';
  description: string = '';
  userInput: boolean = false;
  hasChild: boolean = false;
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
