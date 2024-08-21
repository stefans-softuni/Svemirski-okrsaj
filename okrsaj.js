let prompt = require("prompt-sync")({ sigint: true });

function randomUOpsegu(min, max) {
    // Math.floor(Math.random() * (max - min + 1)) + min       =>     {min, min + 1, min + 2, ...., max}
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function svemirskiOkrsaj() {
    // Pocetno stanje
    let energijaStita = 100;
    let brojRaketa = 3;
    let brojNeprijatelja = 0;

    // Tok igre
    for (let sektor = 1; sektor <= 5; sektor++) {
        // 1. Prikazi trenutno stanje
        console.log(`Sektor: ${sektor}/5`);
        console.log(`Energija štita: ${energijaStita}`);
        console.log(`Rakete: ${brojRaketa}`);

        // 2. Generisati nasumicni dogadjaj
        // U JS postoji Math.random() koja vraca slucajan realan broj u opsegu [0, 1)
        // Ako je generisan slucajan broj <= 0.8, to se desava u 80% slucajeva
        let dogadjaj = Math.random();

        if (dogadjaj <= 0.8) {
            // 80% sansa za pojavu neprijateljskog broda
            let hpNeprijatelja = 50;
            console.log(`Neprijateljski brod se pojavio!`);
            console.log(`HP neprijatelja: ${hpNeprijatelja}`);

            while(hpNeprijatelja > 0 && energijaStita > 0)
            {
                // Igrac bira jednu od 3 akcije
                let akcija = prompt(`Izaberite akciju: (a) Laserski napad, (b) Raketa, (c) Pokusaj bekstva `);
                if (akcija == 'a') {
                    // Laserski napad
                    if (Math.random() <= 0.8) {
                        // Pogodak neprijateljskog broda
                        let steta = randomUOpsegu(10, 20);
                        hpNeprijatelja -= steta;
                        console.log(`Pogodak! HP neprijatelja: ${hpNeprijatelja}`);
                    }
                    else {
                        // Promasaj neprijateljskog broda
                        console.log(`Promasaj!`);
                    }
                }
                else if (akcija == 'b') {
                    // Raketa
                    if (brojRaketa > 0) {
                        // Ispaliti raketu
                        brojRaketa--;
                        if (Math.random() <= 0.9) {
                            // Raketa pogodila brod
                            let steta = randomUOpsegu(30, 40);
                            hpNeprijatelja -= steta;
                            console.log(`Pogodak! HP neprijatelja: ${hpNeprijatelja}`);
                        }
                        else {
                            // Promasaj
                            console.log(`Promasaj`);
                        }
                    }
                    else {
                        console.log(`Nemate vise raketa!`);
                    }
                }
                else if (akcija == 'c') {
                    // Pokusaj bekstva
                    if (Math.random() <= 0.5) {
                        console.log(`Uspesno bekstvo!`);
                        break; // Ovo prekida celu petlju i zavrsava igru
                        // continue; // Ovo prelazi na sledeci sektor
                    }
                }

                // Ako je neprijatelj unisten, prikazati poruku o pobedi
                if (hpNeprijatelja <= 0) {
                    console.log(`Pobeda! Neprijateljski brod je unisten`);
                    brojNeprijatelja++;
                    break;
                }
                else {
                    // Neprijatelj uzvraca udarac
                    if (Math.random() <= 0.7) {
                        // Neprijatelj nas je pogodio
                        let steta = randomUOpsegu(10, 15);
                        energijaStita -= steta;
                        console.log(`Neprijatelj nas je pogodio, nas HP: ${energijaStita}`);
                    }
                    else {
                        console.log(`Neprijatelj je promasio`);
                    }
                }

                // Provera da li imamo energije za nastavak igrice
                if (energijaStita <= 0) {
                    console.log(`Vas svemirski brod je unisten, igra je zavrsena!`);
                    break;
                }
            }
        }
        else {
            // 20% sansa za miran prolazak
            console.log(`Miran prolazak kroz sektor`);
        }

        // Provera da li imamo energije za nastavak igrice
        if (energijaStita <= 0) {
            console.log(`Vas svemirski brod je unisten, igra je zavrsena!`);
            break;
        }
    }

    if (energijaStita > 0) {
        console.log(`Cestitamo! Pobedili ste u svemirskom okrsaju i unistili ${brojNeprijatelja} brodova`);
    }
    else {
        console.log(`Nazalost, izgubili ste igru.`);
    }
}

svemirskiOkrsaj();   // poziv nase glavne funkcije