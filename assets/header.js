(function () {
	const header = () => {
		const body = document.querySelector("body");
		const header = document.querySelector(".shopify-section-header");
		const headerDetails = document.querySelector(".menu-drawer-container");
		const headerIsAlwaysSticky =
			header
				.querySelector(".header-wrapper")
				.getAttribute("data-sticky-type") === "always";

		headerDetails.addEventListener("toggle", function (e) {
			const colorScheme =
				this.querySelector("#menu-drawer").dataset.colorScheme;
			header.classList.toggle(colorScheme);
		});

		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape") {
				header.classList.remove("shopify-section-header-sticky", "animate");
				body.classList.remove("overflow-hidden");
			}
		});

		document.addEventListener("scroll", () => {
			let scrollTop = window.scrollY;
			if (scrollTop > header.offsetHeight && headerIsAlwaysSticky) {
				header.classList.add("fixed", "animate");
			} else if (scrollTop <= header.offsetHeight && headerIsAlwaysSticky) {
				header.classList.remove("fixed", "animate");
			}
		});

		const addBackground = () => {
			if (
				header.classList.contains("color-inverse") &&
				!header.classList.contains("shopify-section-header-sticky")
			) {
				header.classList.remove("color-inverse");
			}
		};

		const removeBackground = () => {
			if (document.body.classList.contains("overflow-hidden-tablet")) {
				return;
			}

			if (
				header.classList.contains("header-overlay") &&
				!header.classList.contains("shopify-section-header-sticky")
			) {
				header.classList.add("color-inverse");
			}
		};

		header.addEventListener("mouseenter", addBackground);

		header.addEventListener("focus", addBackground);

		header.addEventListener("focusin", addBackground);

		header.addEventListener("mouseleave", removeBackground);

		header.addEventListener("focusout", removeBackground);
	};

	header();

	document.addEventListener("shopify:section:load", header);
	document.addEventListener("shopify:section:unload", header);
	document.addEventListener("shopify:section:reorder", header);
})();
