(function () {

	function initThemeSwitcher() {
		const switcherElement  = document.querySelector('.theme-switcher');
		const containerElement = document.querySelector('.theme-switcher__container');
		const selectElement    = document.querySelector('.theme-switcher__bar-select');
		const labelElement = document.querySelector('.theme-switcher__bar-toggle-close span');

		var transitionTime = 250;

		function handleClickOutside(event) {
			if (!switcherElement.contains(event.target)) {
				containerElement.classList.remove('theme-container-visible');
				selectElement.classList.remove('active');

				document.removeEventListener('click', handleClickOutside);
			}
		}

		function handleOpenClick(event) {
			event.preventDefault();

			switcherElement.classList.remove('theme-switcher-inactive');
			switcherElement.classList.add('theme-switcher-active');

			labelElement.textContent = 'Hide';
		}

		function handleActivateClick(event) {
			event.preventDefault();

			if (containerElement.classList.contains('theme-container-visible')) {
				containerElement.classList.remove('theme-container-visible');
				selectElement.classList.remove('active');
			} else {
				containerElement.classList.add('theme-container-visible');
				selectElement.classList.add('active');
				document.addEventListener('click', handleClickOutside);
			}
		}

		function handleCloseClick(event) {
			event.preventDefault();

			if (containerElement.classList.contains('theme-container-visible')) {
				containerElement.classList.remove('theme-container-visible');
				selectElement.classList.remove('active');
			} else {
				transitionTime += 100;
			}

			setTimeout(() => {
				switcherElement.classList.remove('theme-switcher-active');
			}, 100); // Set delay for smooth collapsing of the section.

			setTimeout(() => {
				switcherElement.classList.add('theme-switcher-inactive');
				labelElement.textContent = 'Show';
			}, transitionTime); // Set delay equal to transition to prevent hover on the parent element when closing the switcher.
		}

		const openToggles = document.querySelectorAll('.theme-switcher__bar-toggle-open');
		openToggles.forEach(openToggle => {
			openToggle.addEventListener('click', handleOpenClick);
		});

		const activateToggles = document.querySelectorAll('.theme-switcher__bar-select');
		activateToggles.forEach(activateToggle => {
			activateToggle.addEventListener('click', handleActivateClick);
		});

		const closeToggles = document.querySelectorAll('.theme-switcher__bar-toggle-close');
		closeToggles.forEach(closeToggle => {
			closeToggle.addEventListener('click', handleCloseClick);
		});

		// List Items.
		const listToggles        = document.querySelectorAll('.theme-switcher__list-item');
		const cardTitle          = document.querySelector('.theme-switcher__title');
		const cardPrice          = document.querySelector('.theme-switcher__price-value');
		const cardDescription    = document.querySelector('.theme-switcher__description');
		const cardImageContainer = document.querySelector('.theme-switcher__image');
		const cardContainer      = document.querySelector('.theme-swithcer__card');

		let hoverTimeout;

		listToggles.forEach(listToggle => {
			listToggle.addEventListener('mouseenter', function (e) {
				clearTimeout(hoverTimeout);

				const title       = listToggle.dataset.tsTitle;
				const price       = listToggle.dataset.tsPrice;
				const description = listToggle.dataset.tsDescription;
				const image       = listToggle.dataset.tsImage;
				const url         = listToggle.dataset.tsUrl;

				cardContainer.style.opacity = '0';

				cardPrice.innerHTML          = price;
				cardDescription.innerHTML    = description;
				cardTitle.innerHTML          = `<a href="${url}" target="_blank">${title}</a>`;
				cardImageContainer.innerHTML = `<a href="${url}" target="_blank"><img src="${image}" alt="${title}"></a>`;

				cardContainer.style.opacity = '1';
			});

			listToggle.addEventListener('mouseleave', function (e) {
				clearTimeout(hoverTimeout);
			});
		});

		// List Gradients.
		const listContainer = document.querySelector('.theme-switcher__list-outter');
		const listWrapper   = document.querySelector('.theme-switcher__list-wrapper');

		function toggleGradientsVisibility() {
			if (listContainer.scrollTop === 0) {
				listWrapper.style.setProperty('--ts-top-gradient-opacity', '0');
			} else {
				listWrapper.style.setProperty('--ts-top-gradient-opacity', '1');
			}

			if (listContainer.scrollHeight - listContainer.clientHeight === listContainer.scrollTop) {
				listWrapper.style.setProperty('--ts-bottom-gradient-opacity', '0');
			} else {
				listWrapper.style.setProperty('--ts-bottom-gradient-opacity', '1');
			}
		}

		listContainer.addEventListener('scroll', toggleGradientsVisibility);

		toggleGradientsVisibility();
	}

	// Build switcher.
	function buildSwitcher(data) {
		const dataContainer = document.getElementById('theme-switcher-embed');

		let cdnThemes = data.list.sort((a, b) => a.name.localeCompare(b.name));

		// Get current theme.
		let activeThemeName = Shopify?.theme?.name;

		// Set theme data of CDN.
		let activeThemeData = cdnThemes.find(theme =>
			activeThemeName.includes(theme.slug.toLowerCase())
		);

		activeThemeData = activeThemeData ? activeThemeData : data.list[0];

		// Check if the user is visiting the site for the first time using cookies.
		const isFirstVisit = !document.cookie.includes('_ts_visited=true');

		const themesItems = cdnThemes.map(({ name, slug, description, url, website, image, price }) => (
			`<li
				class="theme-switcher__list-item ${ slug === activeThemeData.slug ? 'active' : '' }"
				data-ts-title="${name}"
				data-ts-slug="${slug}"
				data-ts-description="${description}"
				data-ts-url="${url}"
				data-ts-website="${website}"
				data-ts-image="${image}"
				data-ts-price="${price}"
			>
				<a href="${url}" target="_blank">${name}</a>
			</li>`
		)).join('');

		const switcher = `<div class="theme-switcher ${ isFirstVisit ? 'theme-switcher-active' : 'theme-switcher-inactive' }">
			<div class="theme-switcher__container">
				<div class="theme-switcher__list-wrapper">
					<div class="theme-switcher__list-outter">
						<ul class="theme-switcher__list">
							${themesItems}
						</ul>
					</div>
				</div>

				<div class="theme-swithcer__card">
					<div class="theme-switcher__image">
						<a href="${activeThemeData.url}" target="_blank">
							<img src="${activeThemeData.image}" alt="${activeThemeData.name}">
						</a>
					</div>

					<div class="theme-switcher__content">
						<div class="theme-switcher__title">
							<a href="${activeThemeData.url}" target="_blank">
								${activeThemeData.name}
							</a>
						</div>

						<div class="theme-switcher__price">
							<span class="theme-switcher__price-value">${activeThemeData.price}</span>
							<span class="theme-switcher__price-currency">USD</span>
						</div>

						<div class="theme-switcher__description">
							${activeThemeData.description}
						</div>
					</div>
				</div>
			</div>

			<div class="theme-switcher__bar">
				<div class="theme-switcher__bar-inner">
					<div class="theme-switcher__bar-left">
						<span class="theme-switcher__bar-label">
							Theme
						</span>

						<div class="theme-switcher__bar-select">
							<span>${activeThemeData.name}</span>
							<i class="icon"></i>
						</div>
					</div>

					<div class="theme-switcher__bar-right">
						<div class="theme-switcher__bar-toggle-open"></div>

						<div class="theme-switcher__bar-toggle-close">
							<i class="icon"></i>
							<span>${ isFirstVisit ? 'Hide' : 'Show' }</span>
						</div>

						<a class="theme-switcher__bar-button" href="${activeThemeData.website}" target="_blank">
							Learn more
						</a>
					</div>
				</div>
			</div>
		</div>`;

		dataContainer.innerHTML = switcher;

		// Set visited.
		document.cookie = '_ts_visited=true';

		initThemeSwitcher();
	}

	fetch('https://cdn.ashstonestudios.com/theme-switcher/db.list.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {

			if (data?.list) {
				localStorage.setItem('tsSwitcher', JSON.stringify(data));

				buildSwitcher(data);
			}
		})
		.catch(error => {
			console.error('Error fetching data:', error);

			const storedThemeSwitcher = localStorage.getItem('tsSwitcher');

			if (storedThemeSwitcher) {
				buildSwitcher(JSON.parse(storedThemeSwitcher));
			}
		});
})();
