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

  // Get platform logo SVG
  function getPlatformLogo(platform) {
    if (platform === 'chatgpt') {
      return `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10a37f"/>
        </svg>
      `;
    } else if (platform === 'claude') {
      return `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17.754 13.97l-4.983 8.73a3.903 3.903 0 0 1-6.785-.07L1.301 13.3a3.896 3.896 0 0 1 .021-3.867L6.006 1.33a3.903 3.903 0 0 1 6.785.07L17.476 10.732a3.896 3.896 0 0 1 .278 3.237z" fill="#CC9B7A"/>
          <path d="M22.699 13.3l-4.685 8.33a3.903 3.903 0 0 1-6.785-.07l-4.684-9.332a3.896 3.896 0 0 1 .021-3.867l4.684-8.33a3.903 3.903 0 0 1 6.785.07l4.685 9.331a3.896 3.896 0 0 1-.021 3.867z" fill="#191919"/>
        </svg>
      `;
    }

    // Default icon
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
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
      // Show loading state
      button.classList.add('loading');
      button.innerHTML = '<span>生成中...</span>';

      // Get platform and topic info
      const platform = detectPlatform();
      const platformName = getPlatformName(platform);
      const topic = getConversationTopic();
      const logo = getPlatformLogo(platform);

      // Clone the element for rendering
      const clone = contentElement.cloneNode(true);

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

      // Generate image using html2canvas
      const canvas = await html2canvas(container, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        windowWidth: container.scrollWidth,
        windowHeight: container.scrollHeight
      });

      // Remove temporary container
      document.body.removeChild(container);

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
      showToast('生成图片失败，请重试', 'error');
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
