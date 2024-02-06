import { Component } from '@angular/core';

@Component({
  selector: 'app-with-defer',
  standalone: true,
  imports: [],
  templateUrl: './with-defer.component.html',
  styleUrl: './with-defer.component.scss'
})
export class WithDeferComponent {

}
/*
for user experience , @defer and @placeholder are important
for developper/debug , @loading and @error may be useful
----------
triggers:
<div #otherPagePart>otherPagePart</div>
@defer (on viewport(otherPagePart))  when #otherPagePart is visible on viewport (visible part of html page)
@defer (on hover(otherPagePart)) when mouse/... over #otherPagePart
@defer (on interaction(aControlOfTheTemplate)) when user interact with aControlOfTheTemplate
@defer (when aBooleanExpression) when aBooleanExpression is true (after changing by code)
*/