# System zarządzania listą zadań do przeczytania

## Opis Projektu

Aplikacja do zarządzania kolekcją książek. Umożliwia przeglądanie, dodawanie, edytowanie, usuwanie oraz filtrowanie książek. Projekt został stworzony przy użyciu Node.js i Express.js.

## Funkcjonalności

- **Wyświetlanie listy książek**: Prezentacja wszystkich książek w systemie.
- **Filtrowanie książek**: Możliwość filtrowania listy książek według:
    - Gatunku
    - Autora
    - Statusu (przeczytana/nieprzeczytana)
- **Dodawanie nowej książki**: Formularz do dodawania nowych pozycji do kolekcji.
- **Edycja danych książki**: Możliwość modyfikacji informacji o istniejącej książce (tytuł, autor, gatunek).
- **Oznaczanie statusu przeczytania**: Zmiana statusu książki na przeczytaną lub nieprzeczytaną.
- **Usuwanie książki**: Usuwanie wybranej książki z kolekcji.

## Instrukcja Uruchomienia Aplikacji

### Wymagania

- Node.js

### Kroki Uruchomienia

1.  **Klonowanie repozytorium (jeśli dotyczy):**
    ```bash
    git clone <adres-repozytorium>
    cd Wzorzec-MVC-final-project
    ```

2.  **Instalacja zależności:**
    W głównym katalogu projektu uruchom komendę:
    ```bash
    npm install
    ```

3.  **Uruchomienie serwera:**
    Aby uruchomić aplikację w trybie deweloperskim (z automatycznym przeładowaniem po zmianach dzięki `nodemon`), użyj komendy:
    ```bash
    npm start
    ```
    Serwer zostanie uruchomiony pod adresem `http://localhost:3000`.

## Wykorzystane Biblioteki Zewnętrzne

- **Express.js**: Framework webowy dla Node.js, używany do budowy aplikacji i obsługi routingu.
- **EJS (Embedded JavaScript templates)**: Silnik szablonów do generowania dynamicznych stron HTML.
- **body-parser**: Middleware do parsowania ciała żądań HTTP (np. danych z formularzy).
- **nodemon**: Narzędzie deweloperskie, które automatycznie restartuje aplikację Node.js po wykryciu zmian w plikach (używane tylko w trybie deweloperskim).

## Struktura Aplikacji

Projekt opiera się na wzorcu MVC:

-   **`main.js`**: Główny plik aplikacji. Inicjalizuje serwer Express, konfiguruje middleware, definiuje główne trasy i uruchamia serwer.
-   **`controllers/`**:
    -   `bookController.js`: Kontroler odpowiedzialny za logikę biznesową związaną z książkami. Obsługuje żądania HTTP, komunikuje się z modelem w celu pobrania lub modyfikacji danych oraz wybiera odpowiedni widok do wyświetlenia użytkownikowi.
-   **`models/`**:
    -   `bookModel.js`: Model reprezentujący dane książek oraz logikę operacji na tych danych (np. pobieranie wszystkich książek, dodawanie, edycja, usuwanie, filtrowanie). W obecnej wersji dane przechowywane są w pamięci (w tablicy).
-   **`views/`**: Katalog zawierający szablony EJS, które są renderowane i wysyłane do przeglądarki użytkownika.
    -   `books.ejs`: Widok wyświetlający listę książek oraz formularze filtrowania.
    -   `add-book.ejs`: Widok z formularzem do dodawania nowej książki.
    -   `edit-book.ejs`: Widok z formularzem do edycji istniejącej książki.
    -   `layouts/main-layout.ejs`: Główny szablon strony, zawierający wspólną strukturę HTML (nagłówek, stopka, nawigacja).
-   **`public/`**: Katalog na pliki statyczne.
    -   `css/style.css`: Plik CSS zawierający style dla aplikacji.
-   **`package.json`**: Plik konfiguracyjny projektu Node.js, zawierający m.in. listę zależności i skrypty.

## Przykładowe Dane Wejściowe

Aplikacja inicjalizuje się z kilkoma przykładowymi książkami zdefiniowanymi w pliku `models/bookModel.js`:

```javascript
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', readStatus: false },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', readStatus: true },
    { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', readStatus: false }
];
```

Podczas dodawania nowej książki przez formularz, użytkownik podaje:
- Tytuł (np. "Władca Pierścieni")
- Autor (np. "J.R.R. Tolkien")
- Gatunek (np. "Fantasy")
