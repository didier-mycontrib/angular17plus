NB: * soit le sous micro-front-end expose (via federation.config.js) le composant principal App
       et celui ci doit alors comporter des imbrications de sous composants (sans sous-route)
    * soit le sous micro-front-end expose (via federation.config.js) le paquet de routes de app.routes.ts
      et dans ce cas là , il vaut mieux:
         - considérer de App.ts/.html n'est pas exposé et ne sert qu'a tester la sous partie seule
         - qu'un sous composant (ex: mfe1) soit associé à la route par défaut (path="")
         et que ce sous composant ait en lui <<router-outlet> et sous routes (children)
            et de quoi naviguer

        Au moment de la fédération, le sous compsant mfe1 sera vu/intégré mais pas App .
        et si mfe1 comporte son sous menu , ça s'intègre facilement.


=====
Attention: à priori styles quasi-globaux (ex: taillwind) fonctionnent mieux
dans src/app/shared/css/tailwind-shared.css (avec @import explicite dans chaque angular component)
que dans src/styles.css 
