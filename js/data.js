// data.js
// --- TIENDA, REGALOS Y MEJORAS ---
const TIENDA_ITEMS = {
    'dadoCargado': {
        nombre: 'Dado Cargado',
        descripcion: 'Asegura que tu próximo tiro sea 4, 5 o 6. (Un solo uso)',
        costo: 300,
        icono: 'fa-dice-six'
    },
    'amuletoFortuna': {
        nombre: 'Amuleto de Fortuna',
        descripcion: 'Fuerza al oponente a repetir su último tiro. (Un solo uso)',
        costo: 400,
        icono: 'fa-clover'
    },
    'tiroSeguro': {
        nombre: 'Tiro Seguro',
        descripcion: 'Garantiza que tu próximo tiro no te pasará de 21. (Un solo uso)',
        costo: 350,
        icono: 'fa-shield-halved'
    },
    'corazonValiente': {
        nombre: 'Corazón Valiente',
        descripcion: 'Si te pasas de 21, tu puntuación se reinicia a 0 en lugar de perder. (Un solo uso)',
        costo: 500,
        icono: 'fa-heart-crack'
    },
    'licenciaApostador': {
        nombre: 'Licencia Gran Apostador',
        descripcion: 'Aumenta permanentemente la apuesta base en +50 fichas.',
        costo: 2000,
        icono: 'fa-gem',
        permanente: true
    },
    'dadosPrecision': {
        nombre: 'Dados de Precisión',
        descripcion: 'Aumenta permanentemente la probabilidad de sacar números bajos (1-3).',
        costo: 2500,
        icono: 'fa-crosshairs',
        permanente: true
    }
};

// REGALOS / ESCENAS ESPECIALES
const INTERACCIONES_REGALO = {
    // Maria
    'maria_rosa': {
        nombre: 'Rosa Italiana',
        costo: 500,
        dialogo: "Oh, *tesoro*... una rosa roja. Tan apasionada como tú. Acércate, quiero darte las gracias como es debido...",
        imagen: IMG_PATH + 'MARIA_REGALO_ROSA.png'
    },
    'maria_collar': {
        nombre: 'Collar Elegante',
        costo: 750,
        dialogo: "*Bellissimo!* Es... perfecto. Me hace sentir como una princesa. Ven, quiero mostrarte lo bien que me queda...",
        imagen: IMG_PATH + 'MARIA_REGALO_COLLAR.png'
    },

    // Jessica
    'jessica_vino': {
        nombre: 'Vino Añejo',
        costo: 1000,
        dialogo: "Un vino excepcional. Tienes buen gusto, *campeón*. Ven, brindemos por nuestras futuras... victorias. Y por lo que viene después.",
        imagen: IMG_PATH + 'JESSICA_REGALO_VINO.png'
    },
    'jessica_orbe': {
        nombre: 'Orbe Enjoyado',
        costo: 1500,
        dialogo: "Intrigante... y exquisito. Quizás deberíamos examinar sus... facetas... más de cerca, ¿no crees?",
        imagen: IMG_PATH + 'JESSICA_REGALO_ORBE.png'
    },

    // Chel
    'chel_oro': {
        nombre: 'Pepita de Oro',
        costo: 1500,
        dialogo: "¡Ooh, brillante! Sabes exactamente lo que me gusta, *doradito*.",
        imagen: IMG_PATH + 'CHEL_REGALO_ORO.png'
    },
    'chel_mapa': {
        nombre: 'Fragmento de Mapa',
        costo: 2000,
        dialogo: "¡Un mapa! ¿Es lo que creo que es? ¡Astuto, *doradito*! Ven conmigo...",
        imagen: IMG_PATH + 'CHEL_REGALO_MAPA.png'
    },

    // Mei
    'mei_pachimari': {
        nombre: 'Pachimari Peluche',
        costo: 1200,
        dialogo: "¡Aww, qué adorable! ¡Es perfecto! Me recuerda que siempre hay algo tierno incluso en medio de la competencia.",
        imagen: IMG_PATH + 'MEI_REGALO_PACHIMARI.png'
    },
    'mei_cryo': {
        nombre: 'Prototipo Criogénico',
        costo: 1800,
        dialogo: "¡Increíble! ¿Cómo lo conseguiste? Esto me da algunas ideas... acércate...",
        imagen: IMG_PATH + 'MEI_REGALO_CRYO.png'
    },

    // Marge Simpson
    'marge_pastel': {
        nombre: 'Pastel Casero',
        costo: 1600,
        dialogo: "Oh, cariño... has pensado en mí. Este pastel se ve delicioso. *Mmm* Ven, probemos juntos...",
        imagen: IMG_PATH + 'MARGE_REGALO_PASTEL.png'
    },
    'marge_collar': {
        nombre: 'Collar de Perlas',
        costo: 2200,
        dialogo: "¡Oh, Dios mío! Esto es... precioso. Me hace sentir especial. Ven aquí, déjame darte las gracias apropiadamente...",
        imagen: IMG_PATH + 'MARGE_REGALO_COLLAR.png'
    },

    // Miranda
    'miranda_implante': {
        nombre: 'Implante Experimental',
        costo: 2500,
        dialogo: "Esto es... información delicada. Tú y yo deberíamos hablar en privado.",
        imagen: IMG_PATH + 'MIRANDA_REGALO_IMPLANTE.png'
    },
    'miranda_dossier': {
        nombre: 'Dossier Clasificado',
        costo: 3000,
        dialogo: "Has conseguido esto para mí... Estoy impresionada. Muy impresionada.",
        imagen: IMG_PATH + 'MIRANDA_REGALO_DOSSIER.png'
    },

    // Nagatoro
    'nagatoro_boceto': {
        nombre: 'Boceto Tímido',
        costo: 900,
        dialogo: "¿Q-qué? ¡¿Quién te dio esto?! ... No lo mires tanto, b-baka...",
        imagen: IMG_PATH + 'NAGATORO_REGALO_BOCHORNO.png'
    },
    'nagatoro_orejitas': {
        nombre: 'Diadema de Orejitas',
        costo: 1400,
        dialogo: "¿Quieres que me la ponga? ¿Así? Jajaja~ te estás sonrojando.",
        imagen: IMG_PATH + 'NAGATORO_REGALO_OREJITAS.png'
    }
};

// --- TROFEOS DESBLOQUEABLES POR VICTORIAS ---
const TROFEOS = {
    'maria': [
        { tipo: 'img', fuente: IMG_PATH + 'MARIA_PREMIO_1.png', descripcion: 'Primera Victoria - Aprendiz Domada' },
        { tipo: 'img', fuente: IMG_PATH + 'MARIA_PREMIO_2.png', descripcion: 'Dominio Dulce' },
        { tipo: 'img', fuente: IMG_PATH + 'MARIA_PREMIO_3.png', descripcion: 'Reina Italiana' },
        { tipo: 'video', fuente: VIDEO_PATH + 'MARIA_TROFEO_FINAL.mp4', descripcion: 'TROFEO FINAL: ¡Noche con Maria!' }
    ],
    'jessica': [
        { tipo: 'img', fuente: IMG_PATH + 'JESSICA_PREMIO_1.png', descripcion: 'Respeto de la Dama' },
        { tipo: 'img', fuente: IMG_PATH + 'JESSICA_PREMIO_2.png', descripcion: 'Favor Personal' },
        { tipo: 'img', fuente: IMG_PATH + 'JESSICA_PREMIO_3.png', descripcion: 'Alta Corte' },
        { tipo: 'video', fuente: VIDEO_PATH + 'JESSICA_TROFEO_FINAL.mp4', descripcion: 'TROFEO FINAL: Audiencia Privada' }
    ],
    'chel': [
        { tipo: 'img', fuente: IMG_PATH + 'CHEL_PREMIO_1.png', descripcion: 'Explorador Afortunado' },
        { tipo: 'img', fuente: IMG_PATH + 'CHEL_PREMIO_2.png', descripcion: 'Socio en el Saqueo' },
        { tipo: 'img', fuente: IMG_PATH + 'CHEL_PREMIO_3.png', descripcion: 'Tesoro Vivo' },
        { tipo: 'video', fuente: VIDEO_PATH + 'CHEL_TROFEO_FINAL.mp4', descripcion: 'TROFEO FINAL: Leyenda Dorada' }
    ],
    'mei': [
        { tipo: 'img', fuente: IMG_PATH + 'MEI_PREMIO_1.png', descripcion: 'Ventisca Superada' },
        { tipo: 'img', fuente: IMG_PATH + 'MEI_PREMIO_2.png', descripcion: 'Corazón Descongelado' },
        { tipo: 'img', fuente: IMG_PATH + 'MEI_PREMIO_3.png', descripcion: 'A-MEI-zing Victoria' },
        { tipo: 'video', fuente: VIDEO_PATH + 'MEI_TROFEO_FINAL.mp4', descripcion: 'TROFEO FINAL: ¡Derretiste a Mei!' }
    ],
    'marge': [
        { tipo: 'img', fuente: IMG_PATH + 'MARGE_PREMIO_1.png', descripcion: 'Marge Impresionada' },
        { tipo: 'img', fuente: IMG_PATH + 'MARGE_PREMIO_2.png', descripcion: 'Marge Seductora' },
        { tipo: 'img', fuente: IMG_PATH + 'MARGE_PREMIO_3.png', descripcion: 'La Verdadera Marge' },
        { tipo: 'video', fuente: VIDEO_PATH + 'MARGE_TROFEO_FINAL.mp4', descripcion: 'TROFEO FINAL: Noche con Marge' }
    ],
    'miranda': [
        { tipo: 'img', fuente: IMG_PATH + 'MIRANDA_PREMIO_1.png', descripcion: 'Confianza Ganada' },
        { tipo: 'img', fuente: IMG_PATH + 'MIRANDA_PREMIO_2.png', descripcion: 'Miembro Valioso' },
        { tipo: 'img', fuente: IMG_PATH + 'MIRANDA_PREMIO_3.png', descripcion: 'Acceso Autorizado' },
        { tipo: 'video', fuente: VIDEO_PATH + 'MIRANDA_TROFEO_FINAL.mp4', descripcion: 'TROFEO FINAL: Sesión Privada' }
    ],
    'nagatoro': [
        { tipo: 'img', fuente: IMG_PATH + 'NAGATORO_PREMIO_1.png', descripcion: 'Te Hizo Sonrojar' },
        { tipo: 'img', fuente: IMG_PATH + 'NAGATORO_PREMIO_2.png', descripcion: 'Te Llama Senpai...' },
        { tipo: 'img', fuente: IMG_PATH + 'NAGATORO_PREMIO_3.png', descripcion: 'Ya es Personal' },
        { tipo: 'video', fuente: VIDEO_PATH + 'NAGATORO_TROFEO_FINAL.mp4', descripcion: 'TROFEO FINAL: “No mires tanto, baka...”' }
    ]
};

// TROFEOS EXTRA POR CITA (Vídeos especiales)
const CITA_TROFEOS_SECRETOS = {
    'maria': {
        tipo: 'video',
        fuente: VIDEO_PATH + 'MARIA_CITA_SECRETO.mp4',
        descripcion: '¡CITA GANADA CON MARIA!'
    },
    'jessica': {
        tipo: 'video',
        fuente: VIDEO_PATH + 'JESSICA_CITA_SECRETO.mp4',
        descripcion: '¡CITA GANADA CON LADY JESSICA!'
    },
    'chel': {
        tipo: 'video',
        fuente: VIDEO_PATH + 'CHEL_CITA_SECRETO.mp4',
        descripcion: '¡CITA GANADA CON CHEL!'
    },
    'mei': {
        tipo: 'video',
        fuente: VIDEO_PATH + 'MEI_CITA_SECRETO.mp4',
        descripcion: '¡CITA GANADA CON MEI!'
    },
    'marge': {
        tipo: 'video',
        fuente: VIDEO_PATH + 'MARGE_CITA_SECRETO.mp4',
        descripcion: '¡CITA GANADA CON MARGE SIMPSON!'
    },
    'miranda': {
        tipo: 'video',
        fuente: VIDEO_PATH + 'MIRANDA_CITA_SECRETO.mp4',
        descripcion: '¡CITA PRIVADA CON MIRANDA!'
    },
    'nagatoro': {
        tipo: 'video',
        fuente: VIDEO_PATH + 'NAGATORO_CITA_SECRETO.mp4',
        descripcion: '¡TIEMPO A SOLAS CON NAGATORO!'
    }
};

// --- DIÁLOGOS DURANTE / POST RONDA ---
const RESPUESTAS_OPONENTES = {
    'maria': {
        victoria: {
            1: ["¡Guau! ¡Buena jugada!", "Nada mal, tesoro."],
            2: ["Dos seguidas... me estás calentando.", "Mmm, interesante ritmo."],
            3: ["Tres veces... ¿estás listo para celebrarlo conmigo, muy de cerca?"]
        },
        derrota: {
            1: ["Oh... no te preocupes, tesoro.", "Ay... casi."],
        }
    },
    'jessica': {
        victoria: {
            1: ["Astuto. Me gusta eso.", "Eso fue... elegante."],
            2: ["Parece que dominas la situación.", "Estás ganando control."],
            3: ["No puedo negarlo: eres impresionante. Ven, hablemos en privado."]
        },
        derrota: {
            1: ["Hmm. Reajustaré estrategia.", "No cantes victoria aún."]
        }
    },
    'chel': {
        victoria: {
            1: ["¡Je! Nada mal, doradito.", "Te está yendo bien."],
            2: ["Wow, ¿te estás guardando algo para después?", "Eso estuvo rico."],
            3: ["Tres. Mío por completo. Ven conmigo, ya."]
        },
        derrota: {
            1: ["¡Jajaja! ¿Eso era todo?", "Awww, pobrecito."]
        }
    },
    'mei': {
        victoria: {
            1: ["¡Buen tiro!", "Te estás calentando."],
            2: ["Dos seguidas... y me estoy poniendo nerviosa..."],
            3: ["¡Asombroso! Creo que mereces... calentarte un poquito más conmigo."]
        },
        derrota: {
            1: ["Oh, no te desanimes. ¡Puedes hacerlo!", "Ups, se te congeló la suerte."]
        }
    },
    'marge': {
        victoria: {
            1: ["¡Oh, muy bien, cariño!", "Tienes talento para esto."],
            2: ["Dos seguidas... estás resultando interesante.", "*Hmm* Quizás deba prestarte más atención..."],
            3: ["Tres veces... Eres increíble. Homer nunca... bueno, ven aquí, te mereces un premio especial."]
        },
        derrota: {
            1: ["Oh, cariño... no te preocupes.", "La suerte no siempre está de tu lado."]
        }
    },
    'miranda': {
        victoria: {
            1: ["No esperaba menos de ti.", "Capacidad confirmada."],
            2: ["Estás superando proyección esperada.", "Esto se está volviendo... interesante."],
            3: ["Has demostrado tu valor. Ahora te ganaste acceso especial."]
        },
        derrota: {
            1: ["No te preocupes. No todos pueden estar a mi altura.", "¿Eso fue tu máximo? Espero que no."]
        }
    },
    'nagatoro': {
        victoria: {
            1: ["¿Eh? ¿Ganaste? Tch... suerte de principiante, senpai~", "Oye oye oye, no te agrandes~"],
            2: ["Dos seguidas... ¿te estás creyendo cool? Mírame a los ojos cuando pierda~", "Aw, te estás poniendo confiado. Eso me gusta."],
            3: ["T-tranquilo, no mires tanto... Es tu premio, ¿ok? Pero no lo cuentes."]
        },
        derrota: {
            1: ["¡JAJAJA! ¿En serio pensabas que ibas ganando?", "Awww, pobrecito, ¿quieres que te anime? ~No."]
        }
    }
};

// Comentarios dinámicos mientras juegas
const COMENTARIOS_EN_JUEGO = {
    'maria': {
        puntuacion_alta: ["Mmm, peligroso... pero sexy.", "Estás jugando con fuego."],
        puntuacion_cercana: ["¡Cuidado, tesoro!", "Ese número está al límite."],
        plantarse: ["¿Te quedas ahí? Interesante elección.", "Sabes cuándo parar... eso me gusta."],
        jugador_bust: ["Ay no... demasiado ambicioso.", "Oh, amore... te pasaste."],
        oponente_bust: ["Ups, me pasé~", "Jajaja... creo que me aceleré."],
        oponente_21: ["21. ¿Impresionado?", "Exacto. Aprende."]
    },
    'jessica': {
        puntuacion_alta: ["Disciplinado. Me agrada.", "Técnicamente sólido."],
        puntuacion_cercana: ["Estás al borde. Decide sabiamente.", "Otro punto y podrías romperte."],
        plantarse: ["Te mantienes. Perfecto.", "Control. Eso respeto."],
        jugador_bust: ["Qué lástima. Y te veía potencial.", "Apresurado. Mal movimiento."],
        oponente_bust: ["Hmph. Margin of error.", "Considera esto... un respiro."],
        oponente_21: ["Precisión absoluta.", "¿Ves? Elegancia."]
    },
    'chel': {
        puntuacion_alta: ["Uuuy, mira ese numerito~", "Eso brilla, doradito."],
        puntuacion_cercana: ["¡Cuidado! ~ o te vas al suelo.", "Estás jugando al límite, me encanta."],
        plantarse: ["¿Te congelaste ahí? Jajaja.", "Te quedaste justo donde yo te quería."],
        jugador_bust: ["¡JA! Te pasaste.", "Ayyy, pobre tesoro."],
        oponente_bust: ["Ups, me embalé.", "Ok ok, ganaste esta."],
        oponente_21: ["Boom. 21. ¿Me vas a invitar a celebrar?", "Yeah, perfecta."]
    },
    'mei': {
        puntuacion_alta: ["¡Buen trabajo! ¡Sigues así!", "¡Estás que ardes! Bueno, no literalmente."],
        puntuacion_cercana: ["¡Cuidado! ¡Estás cerca del límite!", "Uf... qué nervios."],
        plantarse: ["¿Te quedas ahí? ¡Buena estrategia!", "Has decidido congelar tu puntuación~"],
        jugador_bust: ["¡Oh no! ¡Te pasaste!", "Ay... ibas tan bien."],
        oponente_bust: ["Aah, me pasé yo...", "Error de cálculo. Ups."],
        oponente_21: ["¡21! ¡Perfecto!", "Exactamente lo que necesitaba."]
    },
    'marge': {
        puntuacion_alta: ["Ooh, estás jugando arriesgado, cariño.", "Ten cuidado... o quizás no~"],
        puntuacion_cercana: ["Estás al límite... como yo cuando Homer olvida nuestro aniversario.", "¿Otro más? *Hmm* Te gusta el peligro..."],
        plantarse: ["Decisión sensata.", "Sabes cuándo parar. Me gusta eso."],
        jugador_bust: ["Oh, cariño, te pasaste...", "Hmm-hmm, demasiado ambicioso."],
        oponente_bust: ["Oh, Dios mío, me pasé.", "Ups... me dejé llevar."],
        oponente_21: ["¡Perfecto! Como mi cabello.", "Exactamente 21. ¿Impresionado?"]
    },
    'miranda': {
        puntuacion_alta: ["Buen control.", "Estás alineado con el plan."],
        puntuacion_cercana: ["Un paso más y todo cae.", "Riesgo altísimo. ¿Estás seguro?"],
        plantarse: ["Táctica defensiva aceptable.", "Así se juega seriamente."],
        jugador_bust: ["Demasiado impulso. Falta control.", "No te precipites si quieres impresionarme."],
        oponente_bust: ["Error registrado. No volverá a pasar.", "Tómalo como una ventaja temporal."],
        oponente_21: ["Eficiencia máxima.", "Objetivo alcanzado."]
    },
    'nagatoro': {
        puntuacion_alta: ["Oye oye oye, ¿y ese numerito?~", "Míralo, se cree campeón."],
        puntuacion_cercana: ["Si tiras de nuevo y pierdes, me debes algo. ¿Hecho? Jajaja~", "Estás a un pelo del desastre, senpai~"],
        plantarse: ["¿Te asustaste? jajaja~", "¿Ya te rendiste ahí? Qué tierno."],
        jugador_bust: ["¡JAJAJA! Te dije, te dije.", "Awww, perdiste. Ven, dame tu cara triste >:3"],
        oponente_bust: ["Tch. Me pasé. Cállate.", "No digas nada. NADA."],
        oponente_21: ["21~ ¿estás celoso?", "Fácil."]
    }
};

// Interacciones pagas: provocar / susurrar
const INTERACCIONES_JUGADOR = {
    'provocar': {
        'maria': [
            "¿Intentas distraerme, *bello*? Funciona...",
            "¡Oye! Concéntrate en el juego... o en mí.",
            "*Arrossire* N-no hagas eso...",
            "Tu mirada es... intensa."
        ],
        'jessica': [
            "¿Crees que eso me afecta, *campeón*? Divertido.",
            "Una táctica interesante. Veamos si sirve.",
            "Guarda esos trucos para más tarde.",
            "Controla tus impulsos. O no."
        ],
        'chel': [
            "¿Intentas jugar conmigo, *doradito*? Me encanta.",
            "A ver si puedes desconcentrarme de verdad~",
            "Sigue así y tal vez te dé premio doble.",
            "Mmm, travieso."
        ],
        'mei': [
            "¿E-eh? Me desconcentras...",
            "Eso no es muy justo... *se sonroja*",
            "¡Juega limpio!",
            "¿Estás bien?"
        ],
        'marge': [
            "Oh, cariño... eso no es muy educado.",
            "¿Estás intentando ponerme nerviosa? *Hmm-hmm*",
            "Sabes... Homer intenta lo mismo y nunca funciona.",
            "¿De verdad crees que eso va a funcionar conmigo?"
        ],
        'miranda': [
            "¿Esa es tu estrategia psicológica? Hm.",
            "Te gusta probar límites, ¿no?",
            "Estás jugando con fuego corporativo.",
            "Te recuerdo que yo también sé presionar."
        ],
        'nagatoro': [
            "¡JAJA! ¿Eso fue un intento? Qué lindo.",
            "Ohh, te pusiste valiente eh, senpai~",
            "Sigue así y voy a... bueno, no te digo.",
            "¿Te gusto así de cerca o qué?"
        ]
    },
    'susurrar': {
        'maria': [
            "*Sussurrando* ¿Q-qué dices, *tesoro*? Me pones nerviosa...",
            "Tan cerca... hueles bien.",
            "Tus palabras... me hacen sentir... especial.",
            "*Mamma mia*, ten cuidado..."
        ],
        'jessica': [
            "Acércate más si tienes algo importante que decir.",
            "Secretos en la mesa... peligroso y excitante.",
            "¿Buscas mi favor o mi deseo?",
            "Tus susurros son... convincentes."
        ],
        'chel': [
            "¿Un secreto para mí, *doradito*? Me encantan los secretos.",
            "¿Planeando el próximo golpe? Cuenta conmigo.",
            "Al oído suena mejor...",
            "Habla bajo, que los dioses no escuchen."
        ],
        'mei': [
            "¿E-eh? Estás muy cerca...",
            "M-me haces cosquillas...",
            "¿Un secreto científico? ¡Dime!",
            "H-hola..."
        ],
        'marge': [
            "Oh... *se sonroja* ¿Qué estás haciendo?",
            "Tan cerca... me haces sentir... diferente.",
            "No deberías hablar así a una mujer casada... pero sigue.",
            "Homer nunca... *suspira* ven más cerca..."
        ],
        'miranda': [
            "Habla. Solo yo escucharé.",
            "Eso no deberías decirlo en voz alta delante de todos.",
            "Tú y yo después tenemos que hablar seriamente.",
            "Eres más atrevido de lo que parecías."
        ],
        'nagatoro': [
            "E-eh?! ¿Tan cerca? ...B-baka.",
            "Oye oye oye oye, no tan pegado~",
            "¿Así te gusto, ah? jejeje~",
            "Shhh... no digas cosas raras, tonto."
        ]
    }
};

// Preguntas de la cita (minijuego de pregunta correcta)
const CITA_PREGUNTAS = {
    'maria': [
        {
            pregunta: "Dime, tesoro... ¿por qué sigues jugando conmigo?",
            respuestas: [
                { texto: "Porque quiero estar más cerca de ti.", correcta: true },
                { texto: "Por las fichas, obvio.", correcta: false },
                { texto: "Porque no tengo nada mejor que hacer.", correcta: false }
            ]
        }
    ],
    'jessica': [
        {
            pregunta: "¿Qué valoras más en una compañera?",
            respuestas: [
                { texto: "Poder e inteligencia.", correcta: true },
                { texto: "Obediencia absoluta.", correcta: false },
                { texto: "Que no pregunte nada.", correcta: false }
            ]
        }
    ],
    'chel': [
        {
            pregunta: "Oye, doradito... ¿qué te atrae más de mí?",
            respuestas: [
                { texto: "Tu espíritu libre. Y tu sonrisa peligrosa.", correcta: true },
                { texto: "El oro que traes encima.", correcta: false },
                { texto: "Me encantan los problemas.", correcta: false }
            ]
        }
    ],
    'mei': [
        {
            pregunta: "¿Qué es lo que más te motiva?",
            respuestas: [
                { texto: "Proteger a los que quiero... y pasar tiempo contigo.", correcta: true },
                { texto: "La emoción de ganar.", correcta: false },
                { texto: "Probar nuevas tecnologías.", correcta: false }
            ]
        }
    ],
    'marge': [
        {
            pregunta: "Cariño... has sido tan atento conmigo. ¿Qué buscas realmente?",
            respuestas: [
                { texto: "Hacerte sentir especial, como te mereces.", correcta: true },
                { texto: "Solo ganar y conseguir fichas.", correcta: false },
                { texto: "Pasar el tiempo, nada más.", correcta: false }
            ]
        }
    ],
    'miranda': [
        {
            pregunta: "Si confío en ti... ¿qué harás con ese acceso?",
            respuestas: [
                { texto: "Cuidarte la espalda. Y no traicionarte jamás.", correcta: true },
                { texto: "Venderlo al mejor postor.", correcta: false },
                { texto: "No necesito tu confianza.", correcta: false }
            ]
        }
    ],
    'nagatoro': [
        {
            pregunta: "Oye, senpai... sé honesto. ¿Por qué sigues soportándome?",
            respuestas: [
                { texto: "Porque me gustas así como eres, pesada y todo.", correcta: true },
                { texto: "Por lástima.", correcta: false },
                { texto: "No sé, estoy aburrido.", correcta: false }
            ]
        }
    ]
};

// Diálogo que se muestra en la transición antes del super trofeo de cita
const CITA_POST_VICTORIA_DIALOGO = {
    'maria': [
        ["Mmm... lo hiciste perfecto.", "Creo que mereces algo especial.", "Acércate, tesoro..."]
    ],
    'jessica': [
        ["Te has ganado mi tiempo privado.", "Muy poca gente llega a este punto.", "No lo desperdicies."]
    ],
    'chel': [
        ["Uf, qué calor.", "Tú y yo vamos a celebrar esto.", "Sin testigos, ¿sí?"]
    ],
    'mei': [
        ["¡Correcto! ¡Pienso igual!", "Las formalidades ya no importan...", "Podríamos... experimentar... juntos."]
    ],
    'marge': [
        ["Oh... cariño.", "Hace tanto que no me sentía así.", "Ven aquí, no tengas miedo..."]
    ],
    'miranda': [
        ["Eficiencia confirmada.", "Confianza establecida.", "Esto ya es entre tú y yo."]
    ],
    'nagatoro': [
        ["No te acostumbres, ¿sí?", "Solo porque ganaste...", "Voy a estar... un rato contigo. Idiota."]
    ]
};

// Diálogo flotante que aparece encima de los videos de cita
const CITA_VIDEO_DIALOGO = {
    'maria': ["Así...", "No te detengas...", "Más cerca..."],
    'jessica': ["Mantén el control.", "No rompas el ritmo.", "Te quiero enfocado."],
    'chel': ["Ahh~ sí...", "Más, doradito...", "No pares."],
    'mei': ["¡Así! ¡Qué cálido!", "N-no pares...", "Esto es... a-mei-zing..."],
    'marge': ["Oh, Dios mío...", "*Hmm-hmm*~ Sí...", "Esto es... increíble..."],
    'miranda': ["Silencio. Concéntrate en mí.", "Esto es confidencial.", "Nadie más ve esto."],
    'nagatoro': ["N-no me mires así...", "B-baka...", "No se lo digas a nadie, ¿ok?"]
};

// Diálogo flotante que aparece encima de los videos al ganar las 3 rondas (trofeo final normal)
const RONDA_FINAL_VIDEO_DIALOGO = {
    'maria': ["Te lo ganaste, tesoro...", "Quiero más de ti.", "No pares."],
    'jessica': ["Has pasado mi examen.", "Ahora eres mío.", "Así..."],
    'chel': ["Mío. ¿Entendiste?", "Ven acá, doradito~", "No te escapes."],
    'mei': ["Oh... esto es intenso.", "Déjame calentarte...", "Quiero quedarme así."],
    'marge': ["Mmm... esto es mejor que cualquier cosa en Springfield.", "Sigue así, cariño...", "Homer nunca..."],
    'miranda': ["Clasificación: privada.", "Acceso concedido solo a ti.", "Quédate."],
    'nagatoro': ["M-mira para otro lado, bobo...", "Te dejo, pero solo hoy.", "No digas nada."]
};