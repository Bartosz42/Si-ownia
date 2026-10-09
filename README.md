# Trening Bartka — GitHub Pages

Gotowa aplikacja HTML + CSS + JavaScript. Bez instalowania pakietów i bez serwera. Zdjęcia są w folderze exercises. Paczka nie zawiera żadnych wyników treningowych ani danych testowych.

## Publikacja
1. Rozpakuj ZIP.
2. Utwórz repozytorium na GitHub. Przy darmowym koncie wybierz repozytorium publiczne.
3. Wgraj całą zawartość paczki wraz z folderem exercises. Plik index.html musi być bezpośrednio w głównym katalogu repozytorium, nie w dodatkowym podfolderze. Nie wgrywaj samego ZIP-a.
4. Settings → Pages → Build and deployment → Source: Deploy from a branch.
5. Wybierz main oraz /(root), kliknij Save.
6. Poczekaj na publikację. Adres strony pojawi się w Settings → Pages.

Oficjalna instrukcja: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Na telefonie
Otwórz opublikowany adres HTTPS. Android/Chrome: menu → Dodaj do ekranu głównego lub Zainstaluj aplikację. iPhone/Safari: Udostępnij → Do ekranu początkowego. Nazwy opcji mogą zależeć od wersji przeglądarki. Ikona jest dostarczona w paczce. Systemowy ekran uruchamiania zależy od telefonu; aplikacja dodatkowo pokazuje własny ekran ładowania na czas odczytu danych, bez sztucznego opóźnienia.

Po pierwszym otwarciu online i zapisaniu plików w pamięci podręcznej aplikacja działa offline. Nie zamykaj pierwszego otwarcia, zanim pobiorą się zdjęcia. Nie używaj trybu incognito do prowadzenia dziennika.

## Twoje dane
Historia zapisuje się w localStorage tej przeglądarki pod adresem aplikacji. Nie jest wysyłana do GitHub i nie synchronizuje się między urządzeniami. Strona na GitHub Pages może być publiczna, ale pliki nie zawierają Twojej historii. Inna przeglądarka, zmiana domeny albo wyczyszczenie danych strony oznaczają osobną/pustą historię.

Na ekranie głównym otwórz „Kopia danych i aplikacja”: pobierz kopię JSON i przechowuj poza repozytorium. Na nowym urządzeniu wczytaj tę kopię. Wczytanie łączy wpisy po identyfikatorach; identyczne identyfikatory są zastępowane wersją z kopii.

## Ocena treningu
Ocena porównuje łączną objętość wykonanego treningu z ostatnim wcześniejszym ukończonym treningiem tego samego planu. Objętość = suma ciężar × powtórzenia wszystkich wykonanych serii. Więcej serii również podnosi objętość; pominięte serie jej nie dodają.

50% = taki sam wynik, 100% = co najmniej +20% objętości, 0% = co najmniej −20%. Wzór: ogranicz do 0–100 wartość 50 + 2,5 × procentowa zmiana objętości. Pierwszy trening lub zerowa poprzednia objętość nie dostają oceny. Ocena pojawia się w podsumowaniu i kalendarzu, a dzisiejszy ukończony trening również na stronie głównej.

To umowny wskaźnik pracy treningowej, nie pomiar techniki, siły ani przyrostu mięśni. Porównuj ten sam sprzęt i sposób wpisywania obciążenia.

## Pliki
index.html — aplikacja; style.css — wygląd; app.js — logika; sw.js — pamięć offline; manifest.webmanifest — instalacja; icon-192.png, icon-512.png i favicon.svg — ikony; exercises/ — zdjęcia z informacją o źródle i licencji.

Zdjęcia: https://github.com/yuhonas/free-exercise-db. Informacje źródłowe i licencja w exercises/.
