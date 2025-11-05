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

      // Clone the element for rendering
      const clone = contentElement.cloneNode(true);

      // Create a container for the image
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        background: white;
        padding: 40px;
        max-width: 800px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      `;

      // Add branding
      const header = document.createElement('div');
      header.style.cssText = `
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e5e7eb;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      `;
      header.innerHTML = `
        <div style="font-size: 14px; color: #6b7280; display: flex; align-items: center; gap: 8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>AI 回答分享</span>
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

      // Style code blocks with proper formatting
      const preBlocks = clone.querySelectorAll('pre');
      preBlocks.forEach(pre => {
        pre.style.cssText = `
          background: #282c34;
          padding: 16px;
          border-radius: 8px;
          margin: 12px 0;
          overflow-x: auto;
          border: 1px solid #3e4451;
        `;

        const code = pre.querySelector('code');
        if (code) {
          code.style.cssText = `
            font-family: "Fira Code", "Cascadia Code", "Monaco", "Menlo", "Consolas", monospace;
            font-size: 13px;
            line-height: 1.5;
            color: #abb2bf;
            display: block;
            white-space: pre;
          `;
        }
      });

      // Style inline code
      const inlineCodes = clone.querySelectorAll('code:not(pre code)');
      inlineCodes.forEach(code => {
        code.style.cssText = `
          background: #f3f4f6;
          color: #e83e8c;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: "Fira Code", "Monaco", "Menlo", monospace;
          font-size: 0.9em;
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
