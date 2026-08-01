const requestTestModal = document.getElementById("request-test-modal");
const requestTestCloseButton = document.getElementById("request-test-modal-close");
const requestTestFrame = document.getElementById("request-test-frame");
let requestTestOpener;

function setRequestTestFrameHeight(height) {
    const maxHeight = Math.floor(window.innerHeight * 0.75);
    requestTestFrame.style.height = `${Math.min(height, maxHeight)}px`;
}

function resizeRequestTestFrame() {
    try {
        setRequestTestFrameHeight(
            requestTestFrame.contentDocument.documentElement.scrollHeight,
        );
    } catch {
        // The form will report its height when it has finished loading.
    }
}

requestTestFrame.addEventListener("load", resizeRequestTestFrame);

function closeRequestTestModal() {
    requestTestModal.classList.add("hidden");
    requestTestModal.classList.remove("flex");
    requestTestOpener?.focus();
}

document.querySelectorAll("[data-request-test]").forEach((button) => {
    button.addEventListener("click", () => {
        requestTestOpener = button;
        requestTestModal.classList.remove("hidden");
        requestTestModal.classList.add("flex");
        requestTestCloseButton.focus();
        resizeRequestTestFrame();
    });
});

requestTestCloseButton.addEventListener("click", closeRequestTestModal);
requestTestModal.addEventListener("click", (event) => {
    if (event.target === requestTestModal) closeRequestTestModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !requestTestModal.classList.contains("hidden")) {
        closeRequestTestModal();
    }
});
window.addEventListener("message", (event) => {
    if (
        event.origin === window.location.origin &&
        event.source === requestTestFrame.contentWindow &&
        event.data?.type === "request-test-form-height"
    ) {
        setRequestTestFrameHeight(event.data.height);
    }
});
