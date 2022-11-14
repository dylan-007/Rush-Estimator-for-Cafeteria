window.watsonAssistantChatOptions = {
  integrationID: "ce42079d-7f45-47a1-9325-44f2e552a4a9", // The ID of this integration.
  region: "au-syd", // The region your integration is hosted in.
  serviceInstanceID: "8461d744-9a54-4ad0-a5e2-7d593f8e67f6", // The ID of your service instance.
  onLoad: function (instance) {
    instance.render();
  },
};
setTimeout(function () {
  const t = document.createElement("script");
  t.src =
    "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
    (window.watsonAssistantChatOptions.clientVersion || "latest") +
    "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
});
