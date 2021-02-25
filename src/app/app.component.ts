import { Component, OnInit, HostListener } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
// import { NgIf } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'alleszufall';

  deferredPrompt: any;
  showButton = false;

  constructor(private swUpdate: SwUpdate) {}


  @HostListener('window:beforeinstallprompt', ['$event'])

  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
    .then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    this.deferredPrompt = null;
  });
}

ngOnInit() {
  if (this.swUpdate.isEnabled) {
    this.swUpdate.available.subscribe((evt) => {
      const updateApp = window.confirm(`
        Ein Update ist verfügbar (${evt.current.appData['version']} => ${evt.available.appData['version']}).
        Änderungen: ${evt.available.appData['changelog']}
        Wollen Sie das Update jetzt installieren?
      `);
      if (updateApp) { window.location.reload(); }
    });
  }
}
  
}




