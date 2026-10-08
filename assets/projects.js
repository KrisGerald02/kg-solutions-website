(() => {
  const projects = [{"title":{"en":"River Monitoring System in Nicaragua","es":"Sistema de Monitoreo de Ríos en Nicaragua"},"desc":{"es":"Panel dedicado a identificar patrones históricos de desbordamiento, auditar registros de lectura y analizar cada estación a través del tiempo.","en":"Dashboard for identifying historical overflow patterns, auditing reading records and analyzing each station over time."},"technologies":["PostgreSQL","Business Intelligence","DAX"],"bullets":{"es":["Geovisualización nacional de estaciones","Tablero de control","Visualización de tendencias de desbordamiento","Control de niveles de alerta"],"en":["National station geovisualization","Control dashboard","Overflow trend visualization","Alert level monitoring"]},"images":[{"src":"assets/projects/project-1-1.png","alt":"Dashboard INETER - vista 1"},{"src":"assets/projects/project-1-2.png","alt":"Dashboard INETER - vista 2"},{"src":"assets/projects/project-1-3.png","alt":"Dashboard INETER - vista 3"},{"src":"assets/projects/project-1-4.png","alt":"Dashboard INETER - vista 4"},{"src":"assets/projects/project-1-5.png","alt":"Dashboard INETER - vista 5"}],"logo":"assets/projects/ineter-logo.png"},{"title":{"en":"VetPlus 2026 Historical Analysis","es":"Análisis Histórico 2026 VetPlus"},"desc":{"es":"Dashboard de ventas con geolocalización de clientes, desempeño de la fuerza comercial e inventario de productos.","en":"Sales dashboard covering customer geolocation, sales force performance and product inventory."},"technologies":["Business Intelligence","Spreadsheets"],"bullets":{"es":["KPIs de rendimiento","Geovisualización","Análisis multidimensional de producto"],"en":["Performance KPIs","Geovisualization","Multidimensional product analysis"]},"images":[{"src":"assets/projects/project-2-1.png","alt":"VetPlus - vista 1"},{"src":"assets/projects/project-2-2.png","alt":"VetPlus - vista 2"},{"src":"assets/projects/project-2-3.png","alt":"VetPlus - vista 3"},{"src":"assets/projects/project-2-4.png","alt":"VetPlus - vista 4"}],"logo":"assets/projects/vetplus-logo.jpg"},{"title":{"en":"Elite Marry Me Profit Analysis","es":"Análisis de Ganancias Elite Marry Me"},"desc":{"es":"Dashboard para dar seguimiento a propuestas de negocio y analizar el rendimiento de los ingresos.","en":"Dashboard for tracking business proposals and analyzing revenue performance."},"technologies":["Business Intelligence","Looker Studio","BigQuery","Spreadsheets"],"bullets":{"es":["Análisis de rendimiento comercial","Seguimiento de propuestas de negocio","Atribución de canales de venta"],"en":["Commercial performance analysis","Business proposal tracking","Sales channel attribution"]},"images":[{"src":"assets/projects/project-3-1.png","alt":"Elite Marry Me - vista 1"},{"src":"assets/projects/project-3-2.png","alt":"Elite Marry Me - vista 2"}],"logo":"assets/projects/marry-me-logo.jpg"},{"title":{"en":"Junk Rescue Monthly Marketing Performance","es":"Rendimiento Mensual de Marketing de Junk Rescue"},"desc":{"es":"Dashboard mensual de datos de marketing para Junk Rescue. Centraliza información de Excel y del CRM Vonigo para evaluar inversión, leads, costo por lead y conversiones por fuente.","en":"Monthly marketing data dashboard for Junk Rescue. It centralizes Excel and Vonigo CRM data to evaluate spend, leads, cost per lead and conversions by source."},"technologies":["Excel","Vonigo CRM","Business Intelligence","Marketing Analytics"],"bullets":{"es":["Actualización mensual del rendimiento de marketing","Fuentes de datos Excel y CRM Vonigo","Análisis de inversión y leads por fuente","Monitoreo de costo por lead y conversión de llamadas"],"en":["Monthly marketing performance update","Excel and Vonigo CRM data sources","Spend and leads analysis by source","Cost-per-lead and call conversion monitoring"]},"images":[{"src":"assets/projects/project-9-1.png","alt":"Junk Rescue monthly marketing performance dashboard"}],"logo":"assets/projects/junk-rescue-logo.png"},{"title":{"en":"WashBunny Car Wash","es":"Autolavado WashBunny"},"desc":{"es":"Dashboard para autolavado que consolida datos operativos provenientes de Excel y archivos CSV, con reportes en Business Intelligence y colaboración mediante SharePoint.","en":"Car wash dashboard that consolidates operational data from Excel and CSV files, with Business Intelligence reporting and SharePoint-based collaboration."},"technologies":["Excel","CSV","Business Intelligence","SharePoint"],"bullets":{"es":["Fuentes de datos Excel y CSV","Reportes interactivos en Business Intelligence","Colaboración centralizada de archivos mediante SharePoint","Análisis del rendimiento operativo del autolavado"],"en":["Excel and CSV data sources","Interactive reporting in Business Intelligence","Centralized file collaboration through SharePoint","Operational performance analysis for the car wash"]},"images":[{"src":"assets/projects/project-10-1.png","alt":"WashBunny dashboard - view 1"},{"src":"assets/projects/project-10-2.png","alt":"WashBunny dashboard - view 2"},{"src":"assets/projects/project-10-3.png","alt":"WashBunny dashboard - view 3"}],"logo":"assets/projects/washbunny-logo.png"},{"title":{"en":"Weekly Sales Performance Automation","es":"Automatización de Rendimiento Semanal de Ventas"},"desc":{"es":"Reporte semanal de rendimiento de ventas automatizado con Google Apps Script. Consolida datos de BigQuery y HubSpot y distribuye el reporte actualizado por Gmail.","en":"Weekly sales performance report automated with Google Apps Script. It consolidates data from BigQuery and HubSpot and distributes the updated report through Gmail."},"technologies":["Google Apps Script","BigQuery","HubSpot","Gmail"],"bullets":{"es":["Extracción y procesamiento automatizados con Google Apps Script","Integración de datos de BigQuery y HubSpot","Envío semanal del reporte mediante Gmail","Comparación de KPIs contra la semana anterior"],"en":["Automated extraction and processing with Google Apps Script","BigQuery and HubSpot data integration","Weekly report delivery through Gmail","Week-over-week KPI comparison"]},"images":[{"src":"assets/projects/project-8-1.png","alt":"Automated weekly sales performance report"}],"logo":null}];
  const modal = document.getElementById('project-modal');
  const lightbox = document.getElementById('image-lightbox');
  let active = 0, imageIndex = 0;
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'es';
  const label = (es,en) => lang() === 'es' ? es : en;
  function showImage(index) {
    const images = projects[active].images;
    imageIndex = (index + images.length) % images.length;
    const image = images[imageIndex];
    for (const id of ['carousel-image','lightbox-image']) {
      const element = document.getElementById(id);
      element.src = image.src;
      element.alt = image.alt;
    }
    const counter = (imageIndex + 1) + ' / ' + images.length;
    document.getElementById('carousel-counter').textContent = counter;
    document.getElementById('lightbox-counter').textContent = counter;
    document.querySelectorAll('.carousel-thumb').forEach((el,i) => {
      el.classList.toggle('active',i === imageIndex);
      el.setAttribute('aria-pressed',String(i === imageIndex));
    });
  }
  function renderProject() {
    const p = projects[active];
    document.getElementById('modal-title').textContent = p.title[lang()];
    document.getElementById('modal-desc').textContent = p.desc[lang()];
    document.getElementById('modal-highlights').textContent = label('Qué incluye','Project highlights');
    const bullets = document.getElementById('modal-bullets');
    bullets.replaceChildren(...p.bullets[lang()].map(text => {
      const li = document.createElement('li'); li.textContent = text; return li;
    }));
    document.getElementById('modal-tech-list').replaceChildren(...p.technologies.map(text => {
      const span = document.createElement('span'); span.textContent = text; return span;
    }));
    document.getElementById('carousel-thumbs').replaceChildren(...p.images.map((image,i) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'carousel-thumb';
      button.setAttribute('aria-label',label('Ver imagen ','View image ') + (i+1));
      const img = document.createElement('img'); img.src = image.src; img.alt = '';
      button.append(img); button.addEventListener('click',() => showImage(i));
      return button;
    }));
    document.getElementById('modal-close').setAttribute('aria-label',label('Cerrar proyecto','Close project'));
    document.getElementById('lightbox-close').setAttribute('aria-label',label('Cerrar imagen','Close image'));
    document.getElementById('carousel-zoom').setAttribute('aria-label',label('Ampliar imagen','Enlarge image'));
    document.querySelectorAll('.prev').forEach(el => el.setAttribute('aria-label',label('Imagen anterior','Previous image')));
    document.querySelectorAll('.next').forEach(el => el.setAttribute('aria-label',label('Imagen siguiente','Next image')));
    document.getElementById('carousel-zoom-label').textContent = label('Ampliar ↗','Zoom ↗');
    showImage(imageIndex);
  }
  document.querySelectorAll('[data-project-index]').forEach(button => button.addEventListener('click',() => {
    active = Number(button.dataset.projectIndex); imageIndex = 0;
    renderProject(); modal.showModal(); document.body.classList.add('dialog-open');
  }));
  document.getElementById('modal-close').addEventListener('click',() => modal.close());
  document.getElementById('lightbox-close').addEventListener('click',() => lightbox.close());
  document.getElementById('carousel-zoom').addEventListener('click',() => lightbox.showModal());
  modal.addEventListener('close',() => { lightbox.close(); document.body.classList.remove('dialog-open'); });
  [modal,lightbox].forEach(dialog => dialog.addEventListener('click',event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }));
  document.querySelectorAll('.prev').forEach(button => button.addEventListener('click',() => showImage(imageIndex-1)));
  document.querySelectorAll('.next').forEach(button => button.addEventListener('click',() => showImage(imageIndex+1)));
  document.addEventListener('keydown',event => {
    if (!modal.open) return;
    if(event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); showImage(imageIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  window.addEventListener('kg-language-change',() => { if(modal.open) renderProject(); });
})();
