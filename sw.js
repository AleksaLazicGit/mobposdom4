const nazivKesMem="v1";

const statSadrzaj=[
    'index.html',
    'style.css',
    'manifest.json',
    'css/animate.css',
    'css/bootstrap.min.css',
    'css/font-awesome.min.css',
    'css/owl.theme.css',
    'css/owl.transitions.css',
    'css/simple-line-icons.css',
    'images/icons/icon-72x72.png',
    'images/icons/icon-192x192.png',
    'images/icons/icon-512x512.png',
    'images/background.jpg',
    'images/team-img-01.jpg',
    'images/team-img-02.jpg',
    'images/team-img-03.jpg',
    'js/bootstrap.min.js',
    'js/jquery.countTo.js',
    'js/jquery.min.js',
    'js/jquery.waypoints.min.js',        
    'strana2.html'
    

    ];

    self.addEventListener('install', async e=> {
        console.log('instaliran sw');
        const kesMem= await caches.open(nazivKesMem);
        await kesMem.addAll(statSadrzaj);

        return self.skipWaiting();
    })

    self.addEventListener('activate', async e => {
        console.log("aktiviran sw");
    
        self.clients.claim();
    });

    self.addEventListener('fetch', async dog => {
        const zahtev = dog.request;
        const url = new URL(zahtev.url);
    
        if (url.origin === location.origin) {
            dog.respondWith(vratiIzKesMemorije(zahtev));
        } else {
            dog.respondWith(vratiSaMrezeIliIzKesMemorije
                (zahtev));
        }
    
    });

    async function vratiIzKesMemorije(zahtev) {
        const kes = await caches.open(nazivKesMem);
        const kesiraniPodaci = await kes.match(zahtev);
        return kesiraniPodaci || fetch(zahtev);
    }
    
    async function vratiSaMrezeIliIzKesMemorije(zahtev) {
        const kes = await caches.open(nazivKesMem);
    
        try {
            const najnovijiPodaci = await fetch(zahtev);
            await kes.put(zahtev, najnovijiPodaci.clone());
            return najnovijiPodaci;
        } catch (error) {
            const kesiraniPodaci = await kes.match(zahtev);
            return kesiraniPodaci;
        }
    
    }

    
   
