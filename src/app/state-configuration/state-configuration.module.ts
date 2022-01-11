import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from "@ngxs/store";
import {ChannelState} from "./modules/channel-configuration/channel/channel.state";
import {DialectState} from "./modules/external-interfaces/iso8583configuration/iso8583-dialect/dialect.state";
import {MessageFormatState} from "./modules/message-format/message-format.state";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsDispatchPluginModule} from "@ngxs-labs/dispatch-decorator";
import {NgxsResetPluginModule} from "ngxs-reset-plugin";
import {ChannelTypeState} from "./modules/channel-configuration/channel-type/channel-type.state";
import {
  ISO8583FieldState
} from "./modules/external-interfaces/iso8583configuration/iso8583-field-configuration/iso8583-field.state";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    NgxsModule.forRoot([
      ChannelState,
      ChannelTypeState,
      DialectState,
      ISO8583FieldState,
      MessageFormatState
    ])
  ]
})
export class StateConfigurationModule { }
