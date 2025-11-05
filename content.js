// AI Response Share Plugin
// Adds share buttons to ChatGPT and Claude responses

(function() {
  'use strict';

  // Configuration for different platforms
  const CONFIG = {
    chatgpt: {
      responseSelector: '[data-message-author-role="assistant"]',
      contentSelector: '.markdown',
      containerClass: 'chatgpt-response'
    },
    claude: {
      responseSelector: '[data-test-render-count]',
      contentSelector: '.font-claude-message',
      containerClass: 'claude-response'
    }
  };

  // Detect current platform
  function detectPlatform() {
    const hostname = window.location.hostname;
    if (hostname.includes('openai.com') || hostname.includes('chatgpt.com')) {
      return 'chatgpt';
    } else if (hostname.includes('claude.ai')) {
      return 'claude';
    }
    return null;
  }

  // Get conversation topic/title
  function getConversationTopic() {
    const platform = detectPlatform();

    if (platform === 'chatgpt') {
      // Try to get ChatGPT conversation title
      const titleElement = document.querySelector('title');
      if (titleElement && titleElement.textContent) {
        const title = titleElement.textContent.replace(/\s*-\s*ChatGPT\s*$/i, '').trim();
        if (title && title !== 'ChatGPT') {
          return title;
        }
      }
      // Fallback: try to get from h1
      const h1 = document.querySelector('h1');
      if (h1 && h1.textContent && h1.textContent !== 'ChatGPT') {
        return h1.textContent.trim();
      }
    } else if (platform === 'claude') {
      // Try to get Claude conversation title
      const titleElement = document.querySelector('title');
      if (titleElement && titleElement.textContent) {
        const title = titleElement.textContent.replace(/\s*\|\s*Claude\s*$/i, '').trim();
        if (title && title !== 'Claude') {
          return title;
        }
      }
    }

    return '对话分享';
  }

  // Get platform logo HTML
  function getPlatformLogo(platform) {
    if (platform === 'chatgpt') {
      return `
        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #10a37f 0%, #1a7f64 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
      `;
    } else if (platform === 'claude') {
      return `
        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #CC9B7A 0%, #A67C5C 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 9h6M9 15h6"/>
          </svg>
        </div>
      `;
    }

    // Default icon
    return `
      <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
    `;
  }

  // Get platform display name
  function getPlatformName(platform) {
    if (platform === 'chatgpt') return 'ChatGPT';
    if (platform === 'claude') return 'Claude';
    return 'AI';
  }

  // Create share button
  function createShareButton() {
    const button = document.createElement('button');
    button.className = 'ai-share-button';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
      <span>分享为图片</span>
    `;
    button.title = '生成分享图片';
    return button;
  }

  // Parse markdown content
  function parseMarkdown(content) {
    if (typeof marked !== 'undefined') {
      return marked.parse(content);
    }
    return content;
  }

  // Create preview modal
  function createPreviewModal(canvas) {
    const modal = document.createElement('div');
    modal.className = 'ai-share-modal';
    modal.innerHTML = `
      <div class="ai-share-modal-overlay"></div>
      <div class="ai-share-modal-content">
        <div class="ai-share-modal-header">
          <h3>图片预览</h3>
          <button class="ai-share-modal-close" title="关闭">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="ai-share-modal-body">
          <img src="${canvas.toDataURL()}" alt="预览图片" />
        </div>
        <div class="ai-share-modal-footer">
          <button class="ai-share-modal-download">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>下载图片</span>
          </button>
        </div>
      </div>
    `;

    // Close modal on overlay click
    const overlay = modal.querySelector('.ai-share-modal-overlay');
    overlay.addEventListener('click', () => {
      closeModal(modal);
    });

    // Close modal on close button click
    const closeBtn = modal.querySelector('.ai-share-modal-close');
    closeBtn.addEventListener('click', () => {
      closeModal(modal);
    });

    // Download image
    const downloadBtn = modal.querySelector('.ai-share-modal-download');
    downloadBtn.addEventListener('click', () => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-response-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('图片已保存！');
        closeModal(modal);
      });
    });

    // Close on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal(modal);
      }
    };
    document.addEventListener('keydown', escapeHandler);
    modal._escapeHandler = escapeHandler;

    return modal;
  }

  // Close modal
  function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      if (modal.parentNode) {
        document.body.removeChild(modal);
      }
      if (modal._escapeHandler) {
        document.removeEventListener('keydown', modal._escapeHandler);
      }
    }, 300);
  }

  // Generate share image
  async function generateShareImage(contentElement, button) {
    try {
      console.log('[AI Share] Starting image generation...');

      // Show loading state
      button.classList.add('loading');
      button.innerHTML = '<span>生成中...</span>';

      // Get platform and topic info
      const platform = detectPlatform();
      const platformName = getPlatformName(platform);
      const topic = getConversationTopic();
      const logo = getPlatformLogo(platform);

      console.log('[AI Share] Platform info:', { platform, platformName, topic });

      // Clone the element for rendering
      const clone = contentElement.cloneNode(true);
      console.log('[AI Share] Content cloned successfully');

      // Create a container for the image
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        background: white;
        padding: 48px;
        width: 1200px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      `;

      // Add branding with platform logo and topic
      const header = document.createElement('div');
      header.style.cssText = `
        margin-bottom: 24px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e5e7eb;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      `;
      header.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          ${logo}
          <div style="flex: 1;">
            <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 4px;">
              ${platformName}
            </div>
            <div style="font-size: 13px; color: #6b7280;">
              ${topic}
            </div>
          </div>
        </div>
      `;

      container.appendChild(header);

      // Style the cloned content
      clone.style.cssText = `
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: #1f2937;
      `;

      // Remove unwanted elements
      const unwanted = clone.querySelectorAll('button, .ai-share-button-container');
      unwanted.forEach(el => el.remove());

      // Aggressive color format cleanup - remove all class-based styles
      // This prevents oklch colors from CSS stylesheets from being applied
      const allElements = clone.querySelectorAll('*');
      console.log(`[AI Share] Processing ${allElements.length} elements for color cleanup`);

      allElements.forEach(el => {
        try {
          // Remove all class attributes to prevent CSS-based oklch colors
          el.removeAttribute('class');

          // Remove inline styles that might contain oklch
          const styleAttr = el.getAttribute('style');
          if (styleAttr && /oklch|lab\(|lch\(|color\(/.test(styleAttr)) {
            el.removeAttribute('style');
          }
        } catch (e) {
          // Ignore errors
        }
      });
      console.log('[AI Share] Removed all class attributes and problematic inline styles');

      // Style code blocks with Material Design style
      const preBlocks = clone.querySelectorAll('pre');
      preBlocks.forEach(pre => {
        pre.style.cssText = `
          background: #fafafa;
          padding: 20px;
          border-radius: 4px;
          margin: 16px 0;
          overflow-x: auto;
          border-left: 4px solid #42a5f5;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        `;

        const code = pre.querySelector('code');
        if (code) {
          code.style.cssText = `
            font-family: "Roboto Mono", "Fira Code", "Consolas", "Monaco", monospace;
            font-size: 14px;
            line-height: 1.6;
            color: #263238;
            display: block;
            white-space: pre-wrap;
            word-wrap: break-word;
          `;
        }
      });

      // Style inline code with Material Design style
      const inlineCodes = clone.querySelectorAll('code:not(pre code)');
      inlineCodes.forEach(code => {
        code.style.cssText = `
          background: #f5f5f5;
          color: #d32f2f;
          padding: 3px 8px;
          border-radius: 3px;
          font-family: "Roboto Mono", "Consolas", "Monaco", monospace;
          font-size: 0.875em;
          display: inline-block;
          vertical-align: baseline;
          line-height: 1.4;
        `;
      });

      // Style headings
      const headings = clone.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        heading.style.cssText = `
          margin-top: 16px;
          margin-bottom: 8px;
          font-weight: 600;
          color: #111827;
        `;
      });

      // Style lists
      const lists = clone.querySelectorAll('ul, ol');
      lists.forEach(list => {
        list.style.cssText = `
          margin: 8px 0;
          padding-left: 24px;
        `;
      });

      // Style paragraphs
      const paragraphs = clone.querySelectorAll('p');
      paragraphs.forEach(p => {
        p.style.cssText = `
          margin: 8px 0;
          line-height: 1.6;
        `;
      });

      container.appendChild(clone);
      document.body.appendChild(container);
      console.log('[AI Share] Container added to DOM, dimensions:', {
        width: container.scrollWidth,
        height: container.scrollHeight
      });

      // Generate image using html2canvas
      console.log('[AI Share] Starting html2canvas rendering...');
      const canvas = await html2canvas(container, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
        windowWidth: container.scrollWidth,
        windowHeight: container.scrollHeight,
        onclone: (clonedDoc) => {
          console.log('[AI Share] Performing deep cleanup in cloned document');

          // Find our container in the cloned document
          const clonedContainer = Array.from(clonedDoc.querySelectorAll('div')).find(
            div => div.style.position === 'fixed' && div.style.left === '-9999px'
          );

          if (!clonedContainer) {
            console.warn('[AI Share] Could not find cloned container');
            return;
          }

          // Remove all class attributes from container's children
          const clonedElements = clonedContainer.querySelectorAll('*');
          let processedCount = 0;

          clonedElements.forEach(el => {
            try {
              // Remove class to prevent CSS-based oklch colors
              if (el.className) {
                el.removeAttribute('class');
                processedCount++;
              }

              // Override any remaining color styles
              const tagName = el.tagName.toLowerCase();
              if (tagName !== 'svg' && tagName !== 'path' && tagName !== 'circle' && tagName !== 'line' && tagName !== 'rect') {
                // Set safe defaults if no explicit style is set
                if (!el.style.color) {
                  el.style.color = '#1f2937';
                }
                if (!el.style.backgroundColor) {
                  el.style.backgroundColor = 'transparent';
                }
              }
            } catch (e) {
              // Ignore errors
            }
          });

          console.log(`[AI Share] Cleaned ${processedCount} elements in cloned container`);
        }
      });
      console.log('[AI Share] Canvas generated successfully:', {
        width: canvas.width,
        height: canvas.height
      });

      // Remove temporary container
      document.body.removeChild(container);
      console.log('[AI Share] Container removed from DOM');

      // Reset button state
      button.classList.remove('loading');
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        <span>分享为图片</span>
      `;

      // Show preview modal
      const modal = createPreviewModal(canvas);
      document.body.appendChild(modal);

      // Trigger animation
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);

    } catch (error) {
      console.error('Error generating image:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        platform: detectPlatform()
      });

      button.classList.remove('loading');
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        <span>分享为图片</span>
      `;
      showToast(`生成失败: ${error.message}`, 'error');
    }
  }

  // Show toast notification
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `ai-share-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Add share buttons to responses
  function addShareButtons() {
    const platform = detectPlatform();
    if (!platform) return;

    const config = CONFIG[platform];
    const responses = document.querySelectorAll(config.responseSelector);

    responses.forEach((response) => {
      // Check if button already exists
      if (response.querySelector('.ai-share-button')) return;

      // Find content element
      const contentElement = response.querySelector(config.contentSelector) || response;

      // Create button container
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'ai-share-button-container';

      const shareButton = createShareButton();
      shareButton.addEventListener('click', (e) => {
        e.stopPropagation();
        generateShareImage(contentElement, shareButton);
      });

      buttonContainer.appendChild(shareButton);

      // Insert button after the response content
      response.appendChild(buttonContainer);
    });
  }

  // Initialize
  function init() {
    // Add initial buttons
    addShareButtons();

    // Watch for new messages
    const observer = new MutationObserver((mutations) => {
      addShareButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
