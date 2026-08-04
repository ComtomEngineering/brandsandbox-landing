(() => {
    const triggerSelector = "[data-share-menu]";
    let activeTrigger;
    let menu;

    function shareDetails() {
        return {
            title: document.title,
            text: "Explore BrandSandbox.",
            url: window.location.href,
        };
    }

    function closeMenu({ restoreFocus = true } = {}) {
        if (!menu) return;
        menu.remove();
        menu = null;
        if (activeTrigger) activeTrigger.setAttribute("aria-expanded", "false");
        if (restoreFocus) activeTrigger?.focus();
    }

    async function copyLink(button) {
        try {
            await navigator.clipboard.writeText(window.location.href);
            button.querySelector("span:last-child").textContent = "Link copied";
        } catch {
            window.prompt("Copy this link:", window.location.href);
        }
    }

    function createMenu() {
        const details = shareDetails();
        const url = encodeURIComponent(details.url);
        const title = encodeURIComponent(details.title);
        const text = encodeURIComponent(details.text);

        menu = document.createElement("div");
        menu.id = "share-menu";
        menu.className = "fixed inset-0 z-[80] flex items-end justify-center bg-background/50 p-4 sm:items-center";
        menu.setAttribute("role", "dialog");
        menu.setAttribute("aria-modal", "true");
        menu.setAttribute("aria-labelledby", "share-menu-title");
        menu.innerHTML = `
            <div class="w-full max-w-sm rounded-xl border border-outline-variant bg-surface-container p-4 shadow-2xl">
                <div class="mb-3 flex items-center justify-between">
                    <h2 id="share-menu-title" class="font-display text-lg font-bold text-on-surface">Share this page</h2>
                    <button type="button" data-share-close class="inline-flex size-10 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Close share menu">
                        <span class="material-symbols-outlined" aria-hidden="true">close</span>
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener noreferrer" class="rounded-lg border border-outline-variant px-3 py-3 text-sm font-medium text-on-surface hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">Facebook</a>
                    <a href="https://twitter.com/intent/tweet?url=${url}&text=${title}" target="_blank" rel="noopener noreferrer" class="rounded-lg border border-outline-variant px-3 py-3 text-sm font-medium text-on-surface hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">X (Twitter)</a>
                    <a href="mailto:?subject=${title}&body=${text}%0A%0A${url}" class="rounded-lg border border-outline-variant px-3 py-3 text-sm font-medium text-on-surface hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">Email</a>
                    <button type="button" data-copy-link class="rounded-lg border border-outline-variant px-3 py-3 text-left text-sm font-medium text-on-surface hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"><span class="material-symbols-outlined mr-1 align-text-bottom text-base" aria-hidden="true">content_copy</span><span>Copy link</span></button>
                    ${navigator.share ? `<button type="button" data-native-share class="col-span-2 rounded-lg bg-primary px-3 py-3 text-sm font-bold text-on-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary">More sharing options</button>` : ""}
                </div>
            </div>`;
        document.body.append(menu);

        menu.querySelector("[data-share-close]").addEventListener("click", () => closeMenu());
        menu.querySelector("[data-copy-link]").addEventListener("click", (event) => copyLink(event.currentTarget));
        menu.querySelector("[data-native-share]")?.addEventListener("click", async () => {
            try {
                await navigator.share(details);
                closeMenu();
            } catch (error) {
                if (error.name !== "AbortError") console.error("Sharing failed", error);
            }
        });
        menu.addEventListener("click", (event) => {
            if (event.target === menu) closeMenu();
        });
        menu.querySelector("[data-share-close]").focus();
    }

    document.querySelectorAll(triggerSelector).forEach((trigger) => {
        trigger.setAttribute("aria-haspopup", "dialog");
        trigger.setAttribute("aria-expanded", "false");
        trigger.addEventListener("click", () => {
            if (menu) closeMenu({ restoreFocus: false });
            activeTrigger = trigger;
            trigger.setAttribute("aria-expanded", "true");
            createMenu();
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu) closeMenu();
    });
})();
