function applyTheme(theme) {
  const styleElement = document.getElementById('usikuThemeStyle');
  if (styleElement) {
    styleElement.remove();
  }

  const style = document.createElement("style");
  style.id = 'usikuThemeStyle';

  switch (theme) {
    case 'invert':
      style.textContent = `
        html {
          filter: invert(1) hue-rotate(180deg);
        }
        img, video, svg {
          filter: invert(1) hue-rotate(180deg) !important;
        }
        a img, a video, a svg {
          filter: none !important;
        }
      `;
      break;
    case 'eclipse':
      style.textContent = `
        body, html {
          background-color: #121212 !important;
          color: #e0e0e0 !important;
        }
        img, video, svg {
          filter: none !important;
        }
      `;
      break;
    case 'sepia':
      style.textContent = `
        body, html {
          background-color: #4b3621 !important;
          color: #d2b48c !important;
        }
        a {
          color: #ffa500 !important; /* Orange for sepia theme links */
        }
        img, video, svg {
          filter: none !important;
        }
      `;
      break;
    case 'usiku':
      style.textContent = `
        body, html {
          background-color: #001f3f !important;
          color: #ffffff !important;
        }
        img, video, svg {
          filter: none !important;
        }
      `;
      break;
    case 'dawn':
      style.textContent = `
        body, html {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        img, video, svg {
          filter: none !important;
        }
        *:not(a) {
          color: inherit !important;
        }
        a {
          color: #0000ee !important;
        }
      `;
      break;
    case 'off':
      style.textContent = ``;
      break;
    default:
      style.textContent = `
        html {
          filter: invert(1) hue-rotate(180deg);
        }
        img, video, svg {
          filter: invert(1) hue-rotate(180deg) !important;
        }
        a img, a video, a svg {
          filter: none !important;
        }
      `;
  }

  document.head.appendChild(style);
}

function toggleReaderMode(isEnabled) {
  const styleElement = document.getElementById('usikuReaderModeStyle');
  if (styleElement) {
    styleElement.remove();
  }

  if (isEnabled) {
    const readerStyle = document.createElement("style");
    readerStyle.id = 'usikuReaderModeStyle';
    readerStyle.textContent = `
      body, html {
        background: #f2f2f2 !important;
        color: #000 !important;
        font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        line-height: 1.6 !important;
        max-width: 700px !important;
        margin: 20px auto !important;
        padding: 0 20px !important;
      }
      p, h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1em !important;
      }
      a {
        color: #0a84ff !important;
        text-decoration: underline !important;
      }
      img {
        max-width: 100% !important;
        height: auto !important;
        display: block !important;
        margin: 20px auto !important;
      }
      .usiku-sepia-mode body, .usiku-sepia-mode html,
      .usiku-usiku-mode body, .usiku-usiku-mode html {
        color: white !important;
      }
    `;
    document.head.appendChild(readerStyle);

    // Add classes to html and body for specific themes
    const theme = document.querySelector('select#themes').value;
    if (theme === 'sepia') {
      document.documentElement.classList.add('usiku-sepia-mode');
      document.body.classList.add('usiku-sepia-mode');
    } else if (theme === 'usiku') {
      document.documentElement.classList.add('usiku-usiku-mode');
      document.body.classList.add('usiku-usiku-mode');
    }
  } else {
    document.documentElement.classList.remove('usiku-sepia-mode');
    document.body.classList.remove('usiku-sepia-mode');
    document.documentElement.classList.remove('usiku-usiku-mode');
    document.body.classList.remove('usiku-usiku-mode');
  }
}

browser.storage.sync.get(['theme', 'readerMode'], function(result) {
  if (result.theme) {
    applyTheme(result.theme);
  }
  if (result.readerMode) {
    toggleReaderMode(result.readerMode);
  }
});
