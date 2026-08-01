const strategistChatModal = document.getElementById("strategist-chat-modal");
const strategistChatFrame = document.getElementById("strategist-chat-frame");
const strategistChatCollapse = document.getElementById("strategist-chat-collapse");
const strategistChatClose = document.getElementById("strategist-chat-close");

function setStrategistChatCollapsed(collapsed) {
    strategistChatFrame.classList.toggle("hidden", collapsed);
    strategistChatCollapse.setAttribute("aria-expanded", String(!collapsed));
    strategistChatCollapse.setAttribute(
        "aria-label",
        collapsed ? "Expand chat" : "Minimize chat",
    );
    strategistChatCollapse.querySelector("span").textContent = collapsed
        ? "keyboard_arrow_up"
        : "keyboard_arrow_down";
}

document.querySelectorAll("[data-strategist-chat]").forEach((button) => {
    button.addEventListener("click", () => {
        strategistChatModal.classList.remove("hidden");
        setStrategistChatCollapsed(false);
        strategistChatCollapse.focus();
    });
});

strategistChatCollapse.addEventListener("click", () => {
    setStrategistChatCollapsed(
        strategistChatCollapse.getAttribute("aria-expanded") === "true",
    );
});

strategistChatClose.addEventListener("click", () => {
    strategistChatModal.classList.add("hidden");
});
