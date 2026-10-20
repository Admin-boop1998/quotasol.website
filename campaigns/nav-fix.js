/* ===== Quota Solutions — Navigation Loop Fix =====
 * Prevents campaign pages from looping users back to root homepage.
 * Fixes: Home link redirect, logo link redirect, breadcrumb consistency.
 * Add this script to EVERY page via <script src="nav-fix.js"></script> before </body>
 */
(function() {
  var isInCampaigns = window.location.pathname.indexOf('/campaigns/') !== -1;
  var isInCompare = window.location.pathname.indexOf('/compare/') !== -1;
  var isInResources = window.location.pathname.indexOf('/resources/') !== -1;
  var isSubpage = isInCampaigns || isInCompare || isInResources;

  if (!isSubpage) return; // Only fix on inner pages

  // Fix 1: Rewrite "Home" links to campaign hub instead of root
  var allLinks = document.querySelectorAll('a');
  allLinks.forEach(function(link) {
    var href = link.getAttribute('href') || '';
    var text = (link.textContent || '').trim().toLowerCase();

    // Catch links pointing to root homepage
    if (href === '/' || href === '/index.html' || href === '../index.html' || href === '../../index.html') {
      // If it's the logo/brand link, keep it going to campaigns hub
      if (link.classList.contains('brand') || link.classList.contains('nav-logo') || link.closest('.brand') || link.closest('.nav-logo')) {
        link.setAttribute('href', isInCampaigns ? 'index.html' : '/campaigns/index.html');
      }
      // If it says "Home" in nav or breadcrumb
      else if (text === 'home' || text === 'home ›') {
        link.setAttribute('href', isInCampaigns ? 'index.html' : '/campaigns/index.html');
      }
    }
  });

  // Fix 2: Rewrite the travel-services page nav to match main site nav
  var travelServicesPage = window.location.pathname.indexOf('travel-services') !== -1;
  if (travelServicesPage) {
    var navLinks = document.querySelector('.nav-links, .site-nav ul, nav ul');
    if (navLinks) {
      // Standardize nav links to match campaign pages
      var standardLinks = [
        {text: 'Services', href: 'index.html'},
        {text: 'Blog', href: 'blog.html'},
        {text: 'About', href: 'about.html'},
        {text: 'Contact', href: 'contact.html'}
      ];
      // Check if nav has weird links like "How It Works" that don't exist on other pages
      var existingLinks = navLinks.querySelectorAll('a');
      existingLinks.forEach(function(a) {
        var t = (a.textContent || '').trim();
        if (t === 'Home') {
          a.setAttribute('href', 'index.html');
          a.textContent = 'Services';
        }
        if (t === 'How It Works') {
          a.setAttribute('href', 'blog.html');
          a.textContent = 'Blog';
        }
      });
    }
  }

  // Fix 3: Ensure breadcrumb "Home" goes to campaign hub
  var breadcrumbs = document.querySelectorAll('.breadcrumb-nav a, .crumb a, nav[aria-label="Breadcrumb"] a');
  breadcrumbs.forEach(function(bc) {
    var href = bc.getAttribute('href') || '';
    if (href === '/' || href === '/index.html' || href === '../index.html') {
      bc.setAttribute('href', isInCampaigns ? 'index.html' : '/campaigns/index.html');
    }
  });
})();
