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

      // Style code blocks
      const codeBlocks = clone.querySelectorAll('pre, code');
      codeBlocks.forEach(block => {
        block.style.cssText = `
          background: #f3f4f6;
          padding: 12px;
          border-radius: 6px;
          font-family: "Monaco", "Menlo", monospace;
          font-size: 13px;
          overflow-x: auto;
        `;
      });

      container.appendChild(clone);
      document.body.appendChild(container);

      // Generate image using html2canvas
      const canvas = await html2canvas(container, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });

      // Remove temporary container
      document.body.removeChild(container);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-response-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

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

        // Show success message
        showToast('图片已保存！');
      });

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
