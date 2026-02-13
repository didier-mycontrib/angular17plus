il faut ajouter ceci dans src/app/app.config.ts
pour que | number:'1.0-2':'fr' soit bien interprété coté .html

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import localeEn from '@angular/common/locales/en';
registerLocaleData(localeEn);

