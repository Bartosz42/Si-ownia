# Trening Bartka v2 — Progres

Aplikacja HTML/CSS/JS na GitHub Pages, działająca offline po pierwszym pełnym załadowaniu.
Nie ma kont, serwera ani wysyłania wyników. Wszystkie wpisy i ustawienia zapisują się w `localStorage` przeglądarki.

## Bardzo ważne: jak zachować pierwszy trening

1. Otwórz **STARĄ** wersję. Zakończ i zapisz rozpoczęty trening.
2. Na ekranie głównym rozwiń **Kopia danych i aplikacja → Pobierz kopię**. Zapisz plik `trening-bartka-YYYY-MM-DD.json` poza folderem strony (nie publikuj kopii w repozytorium).
3. Opublikuj nowe pliki w **tym samym repozytorium GitHub Pages i pod dokładnie tym samym adresem**. Nowa wersja korzysta z **identycznego klucza historii localStorage v1**, więc normalnie zobaczy dotychczasowe wpisy bez importu.
4. Jeśli historia jest pusta (inna przeglądarka, zmiana adresu, inne urządzenie), wybierz **Kopia danych i aplikacja → Wczytaj kopię**, wskaż wcześniej pobrany plik i potwierdź scalenie.
5. Stary format JSON `version: 1` jest obsługiwany. Nowy eksport `version: 2` zawiera również indywidualne ustawienia ćwiczeń. Wczytanie scala wpisy po ID; taki sam ID w pliku zastępuje aktualny wpis, więc przed importem również warto pobrać aktualną kopię.

**Uwaga:** ZIP zawiera tylko kod i zdjęcia ćwiczeń, a nie Twoje prywatne treningi. Sama instalacja ZIP-a nie kopiuje historii między domenami lub urządzeniami. Nie kasuj danych starej strony, zanim nie sprawdzisz importu.

## Co nowego

- Sugestia `Ten sam ciężar` lub `Można rozważyć mały skok`, z krótkim uzasadnieniem dla **każdego z 14 ćwiczeń** i osobnymi ustawieniami.
- Przycisk `Ten sam ciężar` przepisuje poprzednie obciążenie do bieżącej serii, bez potrzeby wpisywania go od nowa. Drugi przycisk wstawia rekomendowany ciężar, jeśli spełnione zostały warunki.
- 3 rodzaje sprzętu: **SportsArt stos 5 kg + dokładki 1,5 lub 3 kg**, hantle ze stałym skokiem i talerze/sztanga. W zakładce **Progres → Ustawienia ćwiczenia** możesz zmienić rodzaj sprzętu, dostępny skok i indywidualny zakres powtórzeń. Warto dostosować domyślne ustawienia do faktycznie używanej maszyny, sposobu wpisywania obciążenia oraz posiadanych talerzy/hantli.
- Weryfikacja dwóch porównywalnych sesji tego samego planu: ta sama liczba serii roboczych i obciążenie, każda seria u góry zakresu. Bez wcześniejszych danych lub przy spadku powtórzeń aplikacja zaleca pozostać przy bieżącym ciężarze. Skok większy niż 10% dla ćwiczeń wielostawowych lub 8% dla izolowanych zostaje zablokowany (limity ostrożności, nie prawa biologiczne).
- Opcjonalnie przy zapisywaniu serii: **technika poprawna / do poprawy** i powtórzenia w zapasie (RIR). Problemy z techniką albo RIR 0 blokują propozycję zwiększenia ciężaru. Brak wpisu nie jest automatycznie oceniany jako poprawny — zalecenie zawsze wymaga oceny techniki przez ćwiczącego.
- Nowa zakładka Progres: lista 14 ćwiczeń ze statusami ↗ / → / ↘, wykres ciężaru, historia powtórzeń i sugestie dla aktualnego planu.
- Podsumowanie treningu: skala **0–100** orientacyjnie pokazuje zmianę osiągów w porównaniu z ostatnią sesją tego samego planu, a pod nią wpływ każdego porównywalnego ćwiczenia. **50 to podobne wyniki**; poniżej = nieco niższe, powyżej = nieco wyższe. Brak danych → komunikat zamiast pozornego procentu.

## Jak liczymy podsumowanie 0–100

Dla każdej serii roboczej z 4–15 powtórzeniami bierzemy przybliżenie `ciężar × (1 + powtórzenia/30)` (formuła Epleya). Z każdej sesji używane są dwie najwyższe wartości; porównywana jest ta sama liczba serii i ten sam plan treningowy. Trening rozgrzewkowy oznaczony osobno lub znacznie lżejsza pierwsza seria (poniżej 80% najcięższej) nie jest liczona. Nie oceniamy ćwiczeń z niewystarczającymi danymi, niepoprawną techniką lub skokiem przekraczającym 35% (możliwa zmiana sprzętu/wpisu). Średnia procentowych zmian porównywalnych ćwiczeń jest ograniczana dla pojedynczego ćwiczenia do ±12%, a potem przeliczana na skalę `50 + średnia% × 50/6`, ograniczoną do 0–100.

**To własna, jawna heurystyka ułatwiająca przeglądanie historii, a nie naukowo zwalidowany test hipertrofii czy miernik zyskanej/utraconej siły.** Przyrost tkanki mięśniowej nie jest możliwy do oszacowania procentowo z pojedynczego treningu. Na wynik wpływają odpoczynek, przerwy, wysiłek, technika, sprzęt, kolejność ćwiczeń i zwykła zmienność dnia. Nie sugerujemy zwiększania ciężaru na podstawie samego wskaźnika 0–100.

## Dlaczego sugestie są ostrożne

Zasada stopniowego przeciążenia i indywidualizacji ma mocne wsparcie w literaturze, ale **badania nie wskazują jednego optymalnego momentu zwiększenia obciążenia dla każdego ćwiczenia**. Decyzje aplikacji są konserwatywnymi heurystykami, które użytkownik może odrzucić. Szeroki zakres powtórzeń może prowadzić do hipertrofii; trening do całkowitego upadku każdej serii nie jest warunkiem postępu. Poprawna technika, opanowanie ruchu, regeneracja i bezpieczeństwo są ważniejsze od sugestii aplikacji.

Przykładowe źródła naukowe:
- ACSM — Progression Models in Resistance Training for Healthy Adults (2009), PMID 19204579: https://pubmed.ncbi.nlm.nih.gov/19204579/
- Refalo i in., Influence of Resistance Training Proximity-to-Failure on Skeletal Muscle Hypertrophy (2023), PMID 36334240: https://pubmed.ncbi.nlm.nih.gov/36334240/
- Grgic i in., Effects of resistance training performed to repetition failure or non-failure (2022), PMID 33497853: https://pubmed.ncbi.nlm.nih.gov/33497853/
- Resistance training prescription for muscle strength and hypertrophy: network meta-analysis (2023): https://doi.org/10.1136/BJSPORTS-2023-106807

## Instalacja / publikacja

1. Rozpakuj ZIP.
2. Wgraj **zawartość** ZIP-a do katalogu głównego repozytorium GitHub Pages (`index.html`, `app.js`, `progress-engine.js`, `style.css`, `sw.js`, `exercises/`...).
3. Jeżeli masz już wdrożoną starą wersję, po zastąpieniu plików odśwież stronę; czasami zainstalowana aplikacja PWA wymaga ponownego otwarcia/odświeżenia, żeby pobrać nową pamięć podręczną.
4. Używaj HTTPS i tej samej domeny/ścieżki, aby historia zachowała się bez importu.

Zdjęcia: https://github.com/yuhonas/free-exercise-db — licencja i przypisy w `exercises/LICENSE.txt`.
