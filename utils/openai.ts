import { ChatCompletionRequestMessage } from "openai";

export const ChatCompletionMessages = class {
    constructor(messages: Array<ChatCompletionRequestMessage>) {
        this.messages:Array<ChatCompletionRequestMessage> = messages;
    }
};
