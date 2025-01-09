export function getThemeImages(theme){
    const themePhotos = {
        animals:[
            "/assets/styles/Cards/animal/1.png",
            "/assets/styles/Cards/animal/2.png",
            "/assets/styles/Cards/animal/3.png",
            "/assets/styles/Cards/animal/4.png",
            "/assets/styles/Cards/animal/5.png",
            "/assets/styles/Cards/animal/6.png",
            "/assets/styles/Cards/animal/7.png",
            "/assets/styles/Cards/animal/8.png",
            "/assets/styles/Cards/animal/9.png",
            "/assets/styles/Cards/animal/10.png",
            "/assets/styles/Cards/animal/11.png",
            "/assets/styles/Cards/animal/12.png",
            "/assets/styles/Cards/animal/13.png",
            "/assets/styles/Cards/animal/14.png",
            "/assets/styles/Cards/animal/15.png",
            "/assets/styles/Cards/animal/16.png",
            "/assets/styles/Cards/animal/17.png",
            "/assets/styles/Cards/animal/18.png",
            "/assets/styles/Cards/animal/19.png",
            "/assets/styles/Cards/animal/20.png",
            "/assets/styles/Cards/animal/21.png",
            "/assets/styles/Cards/animal/22.png",
            "/assets/styles/Cards/animal/23.png",
            "/assets/styles/Cards/animal/24.png",
        ],
        anime:[
            "/assets/styles/Cards/anime/1.png",
            "/assets/styles/Cards/anime/2.png",
            "/assets/styles/Cards/anime/3.png",
            "/assets/styles/Cards/anime/4.png",
            "/assets/styles/Cards/anime/5.png",
            "/assets/styles/Cards/anime/6.png",
            "/assets/styles/Cards/anime/7.png",
            "/assets/styles/Cards/anime/8.png",
            "/assets/styles/Cards/anime/9.png",
            "/assets/styles/Cards/anime/10.png",
            "/assets/styles/Cards/anime/11.png",
            "/assets/styles/Cards/anime/12.png",
            "/assets/styles/Cards/anime/13.png",
            "/assets/styles/Cards/anime/14.png",
            "/assets/styles/Cards/anime/15.png",
            "/assets/styles/Cards/anime/16.png",
            "/assets/styles/Cards/anime/17.png",
            "/assets/styles/Cards/anime/18.png",
            "/assets/styles/Cards/anime/19.png",
            "/assets/styles/Cards/anime/20.png",
            "/assets/styles/Cards/anime/21.png",
            "/assets/styles/Cards/anime/22.png",
            "/assets/styles/Cards/anime/23.png",
            "/assets/styles/Cards/anime/24.png",
        ],
        animation:[
            "/assets/styles/Cards/animitions/1.png",
            "/assets/styles/Cards/animitions/2.png",
            "/assets/styles/Cards/animitions/3.png",
            "/assets/styles/Cards/animitions/4.png",
            "/assets/styles/Cards/animitions/5.png",
            "/assets/styles/Cards/animitions/6.png",
            "/assets/styles/Cards/animitions/7.png",
            "/assets/styles/Cards/animitions/8.png",
            "/assets/styles/Cards/animitions/9.png",
            "/assets/styles/Cards/animitions/10.png",
            "/assets/styles/Cards/animitions/11.png",
            "/assets/styles/Cards/animitions/12.png",
            "/assets/styles/Cards/animitions/13.png",
            "/assets/styles/Cards/animitions/14.png",
            "/assets/styles/Cards/animitions/15.png",
            "/assets/styles/Cards/animitions/16.png",
            "/assets/styles/Cards/animitions/17.png",
            "/assets/styles/Cards/animitions/18.png",
            "/assets/styles/Cards/animitions/19.png",
            "/assets/styles/Cards/animitions/20.png",
            "/assets/styles/Cards/animitions/21.png",
            "/assets/styles/Cards/animitions/22.png",
            "/assets/styles/Cards/animitions/23.png",
            "/assets/styles/Cards/animitions/24.png",
        ],
        football: [
            "/assets/styles/Cards/football/arsenal.png",
            "/assets/styles/Cards/football/aston.png",
            "/assets/styles/Cards/football/atletico.png",
            "/assets/styles/Cards/football/barcelona.png",
            "/assets/styles/Cards/football/bayern.png",
            "/assets/styles/Cards/football/chelsea.png",
            "/assets/styles/Cards/football/city.png",
            "/assets/styles/Cards/football/dortmund.png",
            "/assets/styles/Cards/football/inter.png",
            "/assets/styles/Cards/football/juventus.png",
            "/assets/styles/Cards/football/lille.png",
            "/assets/styles/Cards/football/liverpool.png",
            "/assets/styles/Cards/football/miami.png",
            "/assets/styles/Cards/football/milan.png",
            "/assets/styles/Cards/football/monaco.png",
            "/assets/styles/Cards/football/napoli.png",
            "/assets/styles/Cards/football/newcastle.png",
            "/assets/styles/Cards/football/psg.png",
            "/assets/styles/Cards/football/realmadrid.png",
            "/assets/styles/Cards/football/roma.png",
            "/assets/styles/Cards/football/sevilla.png",
            "/assets/styles/Cards/football/tottenham.png",
            "/assets/styles/Cards/football/united.png",
            "/assets/styles/Cards/football/valencia.png",
        ]
        
    }
    return themePhotos[theme.toLowerCase()] || [];
}