export function initFooter() {
  const footerHTML = `
    <footer class="site-footer fade-up">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>大雋室內裝潢設計工作室</h4>
            <p>最好的設計，是看不見設計的痕跡。<br>專注中高級住宅，讓生活成為空間的主角。</p>
          </div>
          <div class="footer-col">
            <h4>聯絡我們</h4>
            <ul class="footer-links">
              <li><a href="mailto:contact@dajun.design">contact@dajun.design</a></li>
              <li>高雄市新興區民享街59號1樓</li>
              <li>設計總監：蔡佳吟</li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>社群連結</h4>
            <ul class="footer-links">
              <li><a href="javascript:void(0);">Instagram</a></li>
              <li><a href="javascript:void(0);">LINE 官方帳號</a></li>
              <li><a href="javascript:void(0);">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} 大雋室內裝潢設計工作室. All rights reserved.</p>
          <div class="legal-links">
            <a href="javascript:void(0);" class="text-sm" style="margin-right: 15px;">隱私權政策</a>
            <a href="javascript:void(0);" class="text-sm">服務條款</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Inject footer at the end of the body
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}
