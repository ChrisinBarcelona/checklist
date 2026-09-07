/* ============================================================================
   Venta Apartamento — Normandía 301
   Content model. Every user-facing string is { es, en }.
   Source: "Venta Apartamento — Av. Carrera 70 #52-59, Apto 301, Normandía —
   Carpeta de preparación" + Certificado de Tradición 50C-1211767 (06-09-2026).
   ========================================================================== */

const UI = {
  brand:            { es: 'Normandía 301',            en: 'Normandía 301' },
  brandSub:         { es: 'Carpeta de venta',          en: 'Sale pack' },
  menu:             { es: 'Menú',                      en: 'Menu' },
  close:            { es: 'Cerrar',                    en: 'Close' },
  progress:         { es: 'Avance',                    en: 'Progress' },
  done:             { es: 'listas',                    en: 'done' },
  of:               { es: 'de',                        en: 'of' },
  tasksDone:        { es: 'tareas completadas',        en: 'tasks completed' },
  copy:             { es: 'Copiar',                    en: 'Copy' },
  copied:           { es: 'Copiado',                   en: 'Copied' },
  subject:          { es: 'Asunto',                    en: 'Subject' },
  sendInSpanish:    { es: 'Texto para enviar',         en: 'Send this Spanish text' },
  translation:      { es: 'Traducción (referencia)',   en: 'English (reference only)' },
  translationNote:  { es: 'La versión en español es la que se envía. La traducción es solo para entender el contenido.',
                      en: 'Send the Spanish version — these are Colombian institutions. The English is only so you can follow what it says.' },
  whyItMatters:     { es: 'Por qué importa',           en: 'Why it matters' },
  heads:            { es: 'Aviso',                     en: 'Heads up' },
  howToFind:        { es: 'Cómo ubicarlos',            en: 'How to reach them' },
  expand:           { es: 'Ver detalle',               en: 'Open details' },
  collapse:         { es: 'Ocultar',                   en: 'Hide' },
  entity:           { es: 'Entidad',                   en: 'Entity' },
  reference:        { es: 'Radicado / Ref.',           en: 'Ref. number' },
  status:           { es: 'Estado',                    en: 'Status' },
  date:             { es: 'Fecha',                     en: 'Date' },
  procedure:        { es: 'Trámite',                   en: 'Item' },
  trackingHere:     { es: 'Seguimiento de este trámite', en: 'Tracking for this item' },
  refPlaceholder:   { es: 'Nº de radicado…',           en: 'Ref. number…' },
  notes:            { es: 'Notas de la familia',       en: 'Family notes' },
  notesPlaceholder: { es: 'Quién llamó, qué dijeron, qué falta…',
                      en: 'Who called, what they said, what is missing…' },
  resetAll:         { es: 'Borrar todo el progreso',   en: 'Clear all progress' },
  resetConfirm:     { es: '¿Borrar todas las casillas, radicados y notas guardadas en este dispositivo?',
                      en: 'Clear every checkbox, reference number and note saved on this device?' },
  savedLocally:     { es: 'Todo se guarda en este dispositivo. No se envía a ningún servidor.',
                      en: 'Everything is saved on this device only. Nothing is sent to a server.' },
  langLabel:        { es: 'Idioma',                    en: 'Language' },
  backToTop:        { es: 'Volver arriba',             en: 'Back to top' },
  scrollDown:       { es: 'Bajar',                     en: 'Scroll down' },
  copyField:        { es: 'Copiar dato',               en: 'Copy value' },
  print:            { es: 'Imprimir',                  en: 'Print' },
  statuses: {
    pendiente: { es: 'Pendiente',   en: 'Pending' },
    tramite:   { es: 'En trámite',  en: 'In progress' },
    listo:     { es: 'Listo',       en: 'Done' },
    na:        { es: 'No aplica',   en: 'N/A' }
  }
};

// Desktop navbar shows the five track links (the style guide's five-link cluster).
// The overlay menu carries the full set.
const NAV_MAIN = ['valor', 'papeles', 'impuestos', 'agencias', 'contrato'];

const NAV = [
  { id: 'vias',     label: { es: 'Las tres vías',   en: 'The three tracks' } },
  { id: 'inmueble', label: { es: 'El inmueble',     en: 'The property' } },
  { id: 'valor',    label: { es: 'Valor',           en: 'Value' } },
  { id: 'papeles',  label: { es: 'Papeles',         en: 'Documents' } },
  { id: 'impuestos',label: { es: 'Impuestos',       en: 'Taxes' } },
  { id: 'agencias', label: { es: 'Inmobiliarias',   en: 'Agencies' } },
  { id: 'contrato', label: { es: 'Contrato',        en: 'Contract' } },
  { id: 'tablero',  label: { es: 'Tablero',         en: 'Tracker' } },
  { id: 'mercado',  label: { es: 'Mercado',         en: 'Market' } }
];

const HERO = {
  eyebrow:  { es: 'Avenida Carrera 70 #52-59 · Apto 301 · Normandía, Bogotá',
              en: 'Avenida Carrera 70 #52-59 · Apt 301 · Normandía, Bogotá' },
  title:    { es: 'Preparar la venta, paso por paso',
              en: 'Getting the sale ready, step by step' },
  subtitle: { es: 'Carpeta de preparación de la familia',
              en: 'The family preparation pack' },
  intro:    { es: 'Todo lo que hay que pedir, preguntar y firmar antes de poner el apartamento en venta. Marquen cada casilla a medida que avanzan — el progreso queda guardado en este teléfono o computador.',
              en: 'Everything to request, ask and sign before the apartment goes on the market. Tick each box as you go — your progress is saved on this phone or computer.' }
};

const THREE_WAYS = {
  title: { es: 'Las tres vías paralelas', en: 'Three tracks, running at once' },
  lead:  { es: 'No es una fila de seis pasos. Son tres frentes que corren al mismo tiempo.',
           en: 'This is not a queue of six steps. It is three fronts running at the same time.' },
  items: [
    { key: 'A', target: 'valor',
      name: { es: 'Vía A — Valor', en: 'Track A — Value' },
      text: { es: 'Avalúo RAA. Empieza hoy. El perito mide el apartamento, así que no espera a que se confirme el área.',
              en: 'RAA appraisal. Starts today. The appraiser measures the apartment, so it does not wait for the area to be confirmed.' } },
    { key: 'B', target: 'papeles',
      name: { es: 'Vía B — Papeles', en: 'Track B — Documents' },
      text: { es: 'IDU primero (el más lento), luego escrituras, áreas, paz y salvos, poder.',
              en: 'IDU first (the slowest one), then deeds, areas, clearance certificates, power of attorney.' } },
    { key: 'C', target: 'impuestos',
      name: { es: 'Vía C — Impuestos', en: 'Track C — Taxes' },
      text: { es: 'Cita con el contador. Debe ocurrir antes de fijar precio.',
              en: 'Appointment with the accountant. It has to happen before setting a price.' } }
  ],
  rule: { es: 'Solo cuando A y B estén listas se habla con inmobiliarias.',
          en: 'Only once A and B are done do you talk to estate agencies.' }
};

/* --------------------------------------------------------------------------
   Section 0 — Property data
   -------------------------------------------------------------------------- */

const PROPERTY = {
  title: { es: 'Datos del inmueble', en: 'Property details' },
  lead:  { es: 'Para copiar en cualquier trámite. Toquen cualquier dato para copiarlo.',
           en: 'To paste into any application. Tap any value to copy it.' },
  rows: [
    { k: { es: 'Matrícula inmobiliaria', en: 'Property registration no.' }, v: '50C-1211767', copy: true },
    { k: { es: 'CHIP / NUPRE', en: 'CHIP / NUPRE' }, v: 'AAA0060KHPA', copy: true },
    { k: { es: 'Código catastral', en: 'Cadastral code' }, v: '005507056300103001', copy: true },
    { k: { es: 'Titular registrada', en: 'Registered owner' },
      v: 'GÓMEZ LONDOÑO GLORIA CONSTANZA', sub: 'C.C. 51.646.323', copy: true },
    { k: { es: 'Dirección (folio)', en: 'Address (registry folio)' },
      v: 'Carrera 66 A 52-59, Apartamento 301, Edificio "San Luis"', copy: true },
    { k: { es: 'Dirección (actual)', en: 'Address (current)' },
      v: 'Avenida Carrera 70 #52-59, Apto 301', copy: true },
    { k: { es: 'Dirección (catastral)', en: 'Address (cadastral)' }, v: 'AK 70 52 59 AP 301', copy: true },
    { k: { es: 'Localidad', en: 'Locality' }, v: 'Engativá, Bogotá D.C.' },
    { k: { es: 'Círculo registral', en: 'Registry circle' }, v: '50C — Bogotá Zona Centro' },
    { k: { es: 'Escritura de adquisición', en: 'Purchase deed' },
      v: 'No. 2043 del 15-07-2005, Notaría 64 de Bogotá', copy: true },
    { k: { es: 'Reglamento de P.H.', en: 'Condominium bylaws' },
      v: 'Escritura No. 1102 del 04-05-1989, Notaría 19 de Bogotá', copy: true },
    { k: { es: 'Reforma del reglamento', en: 'Bylaws amendment' },
      v: 'Escritura No. 9501 del 22-12-2003, Notaría 19 de Bogotá',
      sub: { es: 'Ley 675 de 2001', en: 'Law 675 of 2001' }, copy: true },
    { k: { es: 'Estado del folio', en: 'Folio status' },
      v: { es: 'ACTIVO — sin hipoteca, sin embargo, sin usufructo, sin patrimonio de familia',
           en: 'ACTIVE — no mortgage, no lien, no usufruct, no family-homestead protection' } },
    { k: { es: 'Último certificado de tradición', en: 'Latest title certificate' },
      v: '06-09-2026 — Turno 2026-50C-1-644189', copy: true }
  ],
  note: { es: 'Las tres direcciones corresponden al mismo inmueble (renumeración de nomenclatura, corregida en la salvedad del 18-08-2007). Las tres deben aparecer en la promesa de compraventa.',
          en: 'All three addresses are the same property (street renumbering, corrected in the 18-08-2007 registry amendment). All three must appear in the promise-of-sale contract.' },
  chainTitle: { es: 'Lo que dice el certificado de tradición', en: 'What the title certificate says' },
  chainLead:  { es: 'Cuatro anotaciones en total. Folio abierto el 07-06-1989 con base en la matrícula 50C-509091.',
                en: 'Four entries in total. Folio opened 07-06-1989 on the basis of registration 50C-509091.' },
  chain: [
    { n: '001', date: '16-05-1989',
      t: { es: 'Reglamento de Propiedad Horizontal — Escritura 1102 del 04-05-1989, Notaría 19. Constructora IZA Limitada.',
           en: 'Condominium bylaws — Deed 1102 of 04-05-1989, Notaría 19. Constructora IZA Limitada.' } },
    { n: '002', date: '21-05-1990',
      t: { es: 'Compraventa — Escritura 614 del 16-03-1990, Notaría 19. Valor $5.000.000. Constructora IZA → Jesús Delgado Alfaro.',
           en: 'Sale — Deed 614 of 16-03-1990, Notaría 19. Value $5,000,000. Constructora IZA → Jesús Delgado Alfaro.' } },
    { n: '003', date: '07-01-2004',
      t: { es: 'Reforma del reglamento adecuándolo a la Ley 675 de 2001 — Escritura 9501 del 22-12-2003, Notaría 19.',
           en: 'Bylaws amended to comply with Law 675 of 2001 — Deed 9501 of 22-12-2003, Notaría 19.' } },
    { n: '004', date: '10-02-2006',
      t: { es: 'Compraventa — Escritura 2043 del 15-07-2005, Notaría 64. Valor $47.000.000. Jesús Delgado Alfaro → Gloria Constanza Gómez Londoño (titular actual).',
           en: 'Sale — Deed 2043 of 15-07-2005, Notaría 64. Value $47,000,000. Jesús Delgado Alfaro → Gloria Constanza Gómez Londoño (current owner).' } }
  ],
  areaWarn: { es: 'El folio registra 61,04 m² en “cabida y linderos”, pero los campos de ÁREA PRIVADA y COEFICIENTE aparecen en blanco. Por eso hay que confirmar el área privada con la escritura 2043 y con el cuadro de áreas del reglamento — sin ese dato no se puede fijar un precio por m².',
             en: 'The folio records 61.04 m² under “cabida y linderos”, but the PRIVATE AREA and COEFFICIENT fields are blank. That is exactly why the private area has to be confirmed against deed 2043 and the bylaws area schedule — without it there is no reliable price per m².' }
};

/* --------------------------------------------------------------------------
   Tracks and tasks
   -------------------------------------------------------------------------- */

const TRACKS = [
  {
    id: 'valor', key: 'A',
    name:  { es: 'Vía A — Valor',  en: 'Track A — Value' },
    title: { es: 'Saber cuánto vale', en: 'Find out what it is worth' },
    lead:  { es: 'Empieza hoy. El perito mide el apartamento, así que no espera a que se confirme el área.',
             en: 'Starts today. The appraiser measures the apartment, so it does not wait for the area to be confirmed.' },
    tasks: [
      {
        id: 'a1',
        title: { es: 'Pedir avalúo comercial a un perito RAA', en: 'Request a commercial appraisal from an RAA appraiser' },
        entity: { es: 'Perito RAA', en: 'RAA appraiser' },
        flag: { es: 'Empezar hoy', en: 'Start today' },
        lead: { es: 'Pidan cotización a dos o tres peritos inscritos en el Registro Abierto de Avaluadores.',
                en: 'Get quotes from two or three appraisers listed on the Registro Abierto de Avaluadores.' },
        board: ['1'],
        blocks: [
          { type: 'script',
            label: { es: 'Mensaje para enviar a los peritos', en: 'Message to send to appraisers' },
            body: {
              es: 'Buenos días. Requiero un avalúo comercial para un inmueble en Bogotá, con destino a la venta.\n\n- Apartamento de 3 habitaciones y 2 baños, tercer piso\n- Avenida Carrera 70 No. 52-59, Apto 301, barrio Normandía, Engativá\n- Matrícula inmobiliaria 50C-1211767\n\nRequisitos:\n1. Que el avalúo sea realizado por un perito inscrito en el Registro Abierto de Avaluadores (RAA), y que el número de registro RAA aparezca en el informe.\n2. Que el informe incluya comparables de transacciones cerradas en el sector, no precios de oferta.\n3. Que se indique expresamente el área privada medida del inmueble.\n\nAgradezco cotización y tiempo de entrega.',
              en: 'Good morning. I need a commercial appraisal for a property in Bogotá, for the purpose of selling it.\n\n- 3-bedroom, 2-bathroom apartment, third floor\n- Avenida Carrera 70 No. 52-59, Apt 301, Normandía neighbourhood, Engativá\n- Property registration 50C-1211767\n\nRequirements:\n1. The appraisal must be carried out by an appraiser listed on the Registro Abierto de Avaluadores (RAA), and the RAA registration number must appear in the report.\n2. The report must include comparables from closed transactions in the area, not asking prices.\n3. It must expressly state the measured private area of the property.\n\nPlease send me a quote and an estimated delivery time.' } },
          { type: 'list',
            title: { es: 'Los tres requisitos no son negociables', en: 'The three requirements are not negotiable' },
            items: [
              { es: 'Perito inscrito en el RAA, con el número de registro impreso en el informe.',
                en: 'Appraiser listed on the RAA, with the registration number printed in the report.' },
              { es: 'Comparables de transacciones cerradas, no precios de oferta de portales.',
                en: 'Comparables from closed transactions — not asking prices scraped off property portals.' },
              { es: 'Área privada medida en sitio y escrita en el informe.',
                en: 'Private area measured on site and stated in the report.' }
            ] },
          { type: 'note',
            text: { es: 'Rango de costo esperado: $350.000 – $900.000 COP.',
                    en: 'Expected cost range: $350,000 – $900,000 COP.' } }
        ]
      },
      {
        id: 'a2',
        title: { es: 'Consulta catastral por CHIP', en: 'Cadastral lookup by CHIP' },
        entity: { es: 'Catastro Bogotá', en: 'Catastro Bogotá' },
        lead: { es: 'Consultar el predio con el CHIP AAA0060KHPA para ver el área y el avalúo catastral registrados.',
                en: 'Look the property up with CHIP AAA0060KHPA to see the recorded area and cadastral value.' },
        board: ['2'],
        blocks: [
          { type: 'kv',
            title: { es: 'Datos para la consulta', en: 'Data for the lookup' },
            rows: [
              { k: 'CHIP', v: 'AAA0060KHPA' },
              { k: { es: 'Código catastral', en: 'Cadastral code' }, v: '005507056300103001' },
              { k: { es: 'Dirección catastral', en: 'Cadastral address' }, v: 'AK 70 52 59 AP 301' }
            ] },
          { type: 'warn',
            text: { es: 'El avalúo catastral NO sirve como referencia de precio — en Bogotá suele estar entre 40% y 60% por debajo del valor comercial. Sirve para verificar área y datos del predio, nada más.',
                    en: 'The cadastral value is NOT a price reference — in Bogotá it usually sits 40% to 60% below market value. Use it to verify the area and property data, nothing else.' } }
        ]
      },
      {
        id: 'a3',
        title: { es: 'Leer la referencia de mercado antes de hablar con nadie', en: 'Read the market reference before talking to anyone' },
        entity: { es: 'Familia', en: 'Family' },
        lead: { es: 'Para poder juzgar si la cifra que da una inmobiliaria es plausible.',
                en: 'So you can judge whether an agency’s number is plausible.' },
        blocks: [
          { type: 'why',
            text: { es: 'La tabla del final de esta carpeta no es un avalúo: son precios de oferta ajustados a la baja por edificio de 1989, tercer piso sin ascensor y sin parqueadero confirmado. Sirve para una sola cosa: detectar cuando alguien está inflando o rebajando la cifra.',
                    en: 'The table at the end of this pack is not an appraisal: it is asking prices adjusted downwards for a 1989 building, third floor with no lift, and no confirmed parking space. It is good for exactly one thing: spotting when somebody is inflating or lowballing the number.' } },
          { type: 'note',
            text: { es: 'Expectativa realista de venta: $270 – $330 millones. Precio de lista sugerido: $340 – $360 millones.',
                    en: 'Realistic sale expectation: $270 – $330 million. Suggested list price: $340 – $360 million.' } }
        ]
      }
    ]
  },

  {
    id: 'papeles', key: 'B',
    name:  { es: 'Vía B — Papeles', en: 'Track B — Documents' },
    title: { es: 'Reunir los documentos', en: 'Gather the documents' },
    lead:  { es: 'IDU primero, que es el más lento. Luego escrituras, áreas, paz y salvos y poder.',
             en: 'IDU first — it is the slowest. Then deeds, areas, clearance certificates and power of attorney.' },
    tasks: [
      {
        id: 'b1',
        title: { es: 'IDU — paz y salvo de valorización', en: 'IDU — betterment-levy clearance' },
        entity: { es: 'IDU', en: 'IDU' },
        flag: { es: 'Empezar por aquí', en: 'Start here' },
        lead: { es: 'Es el trámite más lento de todos. Escribir al chat del IDU hoy mismo.',
                en: 'This is the slowest item of all. Message the IDU chat today.' },
        board: ['6'],
        blocks: [
          { type: 'script',
            label: { es: 'Guion para el chat del IDU', en: 'Script for the IDU chat' },
            body: {
              es: 'Buenos días. Necesito el Certificado de Estado de Cuenta para Trámite Notarial (paz y salvo de valorización) para un inmueble que vamos a vender. El sistema en línea no lo genera automáticamente y me indica que requiere atención personalizada.\n\nDatos del predio:\n- CHIP: AAA0060KHPA\n- Matrícula inmobiliaria: 50C-1211767\n- Dirección: Avenida Carrera 70 No. 52-59, Apartamento 301\n- Titular: Gloria Constanza Gómez Londoño, C.C. 51.646.323\n\n¿Me pueden indicar el procedimiento, los documentos requeridos y el tiempo estimado de expedición?',
              en: 'Good morning. I need the Certificado de Estado de Cuenta para Trámite Notarial (betterment-levy clearance certificate) for a property we are going to sell. The online system does not generate it automatically and tells me it requires personal assistance.\n\nProperty data:\n- CHIP: AAA0060KHPA\n- Property registration: 50C-1211767\n- Address: Avenida Carrera 70 No. 52-59, Apartment 301\n- Owner: Gloria Constanza Gómez Londoño, ID 51,646,323\n\nCould you tell me the procedure, the documents required and the estimated issuing time?' } },
          { type: 'warn',
            text: { es: 'Guarden el número de radicado. Sin él no hay forma de hacer seguimiento.',
                    en: 'Save the reference (radicado) number. Without it there is no way to follow the case up.' } }
        ]
      },
      {
        id: 'b2',
        title: { es: 'Notaría 64 — copia de la escritura 2043 de 2005', en: 'Notaría 64 — certified copy of deed 2043 of 2005' },
        entity: { es: 'Notaría 64 de Bogotá', en: 'Notaría 64, Bogotá' },
        lead: { es: 'Resuelve dos puntos de golpe: el área privada y el estado civil de la titular en 2005.',
                en: 'Answers two questions at once: the private area, and the owner’s marital status in 2005.' },
        board: ['4'],
        blocks: [
          { type: 'letter',
            subject: { es: 'Solicitud de copia auténtica — Escritura Pública No. 2043 de 2005',
                       en: 'Request for a certified copy — Public Deed No. 2043 of 2005' },
            body: {
              es: 'Respetados señores:\n\nDe manera atenta solicito copia auténtica de la Escritura Pública No. 2043 del 15 de julio de 2005, otorgada en esa Notaría, correspondiente al inmueble identificado con matrícula inmobiliaria No. 50C-1211767, ubicado en la Avenida Carrera 70 No. 52-59, Apartamento 301, Edificio "San Luis", de la ciudad de Bogotá D.C.\n\nLa solicitud se realiza en calidad de titular del derecho de dominio / autorizado por la titular, señora GLORIA CONSTANZA GÓMEZ LONDOÑO, identificada con cédula de ciudadanía No. 51.646.323.\n\nAgradezco me informen el valor de la copia y el medio de pago habilitado, así como el tiempo estimado de entrega.\n\nCordialmente,',
              en: 'Dear Sirs,\n\nI hereby respectfully request a certified copy of Public Deed No. 2043 of 15 July 2005, executed before your Notary Office, corresponding to the property identified with registration number 50C-1211767, located at Avenida Carrera 70 No. 52-59, Apartment 301, "San Luis" Building, Bogotá D.C.\n\nThis request is made in the capacity of holder of title / as a person authorised by the owner, Mrs GLORIA CONSTANZA GÓMEZ LONDOÑO, identified with citizenship card No. 51,646,323.\n\nPlease let me know the cost of the copy and the accepted payment method, as well as the estimated delivery time.\n\nYours faithfully,' } },
          { type: 'why',
            text: { es: 'Resuelve DOS puntos — el área privada del apartamento y el estado civil de la titular al momento de la compra (sociedad conyugal).',
                    en: 'It settles TWO points — the apartment’s private area and the owner’s marital status at the time of purchase (marital property regime).' } }
        ]
      },
      {
        id: 'b3',
        title: { es: 'Notaría 19 — reglamento de propiedad horizontal', en: 'Notaría 19 — condominium bylaws' },
        entity: { es: 'Notaría 19 de Bogotá', en: 'Notaría 19, Bogotá' },
        lead: { es: 'Escrituras 1102 de 1989 y 9501 de 2003. Pedir primero solo el cuadro de áreas.',
                en: 'Deeds 1102 of 1989 and 9501 of 2003. Ask for the area schedule alone first.' },
        board: ['5'],
        blocks: [
          { type: 'letter',
            subject: { es: 'Solicitud de copia auténtica — Escrituras 1102 de 1989 y 9501 de 2003',
                       en: 'Request for certified copies — Deeds 1102 of 1989 and 9501 of 2003' },
            body: {
              es: 'Respetados señores:\n\nSolicito copia auténtica de las siguientes escrituras otorgadas en esa Notaría, correspondientes al Edificio "San Luis" — Propiedad Horizontal, inmueble con matrícula inmobiliaria 50C-1211767:\n\n1. Escritura Pública No. 1102 del 4 de mayo de 1989 — Reglamento de Propiedad Horizontal.\n2. Escritura Pública No. 9501 del 22 de diciembre de 2003 — Reforma del Reglamento de Propiedad Horizontal (Ley 675 de 2001).\n\nDe ser posible, agradezco indicar si es viable obtener únicamente el cuadro de áreas y coeficientes de copropiedad, con el fin de reducir el costo de la copia.\n\nAgradezco informar el valor y el tiempo estimado de entrega.\n\nCordialmente,',
              en: 'Dear Sirs,\n\nI request certified copies of the following deeds executed before your Notary Office, corresponding to the "San Luis" Building — Horizontal Property, registration number 50C-1211767:\n\n1. Public Deed No. 1102 of 4 May 1989 — Condominium Bylaws.\n2. Public Deed No. 9501 of 22 December 2003 — Amendment to the Condominium Bylaws (Law 675 of 2001).\n\nIf possible, please advise whether it is feasible to obtain only the schedule of areas and co-ownership coefficients, in order to reduce the cost of the copy.\n\nPlease let me know the cost and estimated delivery time.\n\nYours faithfully,' } },
          { type: 'warn',
            text: { es: 'Un reglamento completo es un documento extenso y la copia se cobra por folio. Pidan primero solo el cuadro de áreas.',
                    en: 'A full set of bylaws is a long document and copies are charged per page. Ask for the area schedule alone first.' } }
        ]
      },
      {
        id: 'b4',
        title: { es: 'Administración San Luis — áreas, paz y salvo y administrador', en: 'San Luis building management — areas, clearance and administrator' },
        entity: { es: 'Administración Edificio San Luis', en: 'San Luis building management' },
        lead: { es: 'Una sola carta que resuelve cuatro cosas.',
                en: 'One letter that settles four things.' },
        board: ['3', '8'],
        blocks: [
          { type: 'letter',
            subject: { es: 'Solicitud de información — Apartamento 301', en: 'Request for information — Apartment 301' },
            body: {
              es: 'Cordial saludo:\n\nEn relación con el Apartamento 301 del Edificio San Luis, de propiedad de la señora Gloria Constanza Gómez Londoño, solicito de manera atenta:\n\n1. Copia del cuadro de áreas y coeficientes de copropiedad del Reglamento de Propiedad Horizontal, correspondiente al apartamento 301 (área privada y coeficiente).\n2. Paz y salvo por concepto de cuotas de administración, para trámite de venta.\n3. Confirmación del nombre y datos de contacto del administrador actual y de su vigencia como representante legal de la copropiedad.\n4. Información sobre cuotas extraordinarias vigentes o aprobadas por la asamblea que puedan afectar al inmueble.\n\nQuedo atento a la respuesta y al valor de los trámites que tengan costo.\n\nCordialmente,',
              en: 'Dear Sir or Madam,\n\nRegarding Apartment 301 of the San Luis Building, owned by Mrs Gloria Constanza Gómez Londoño, I respectfully request:\n\n1. A copy of the schedule of areas and co-ownership coefficients from the Condominium Bylaws for apartment 301 (private area and coefficient).\n2. A clearance certificate for administration fees, for the purposes of a sale.\n3. Confirmation of the name and contact details of the current administrator and of their current standing as legal representative of the condominium.\n4. Information on any extraordinary fees in force or approved by the assembly that may affect the property.\n\nI look forward to your reply, including the cost of any items that carry a fee.\n\nYours faithfully,' } },
          { type: 'note',
            title: { es: 'Cómo ubicarlos', en: 'How to reach them' },
            text: { es: 'El recibo mensual de administración de su mamá tiene el nombre, teléfono y cuenta. Alternativamente, la cartelera de la portería.',
                    en: 'Your mother’s monthly administration bill has the name, phone number and account details. Failing that, the noticeboard at the front desk.' } },
          { type: 'subtasks',
            title: { es: 'Las cuatro respuestas que deben llegar', en: 'The four answers that must come back' },
            items: [
              { id: 'b4s1', text: { es: 'Cuadro de áreas y coeficientes del apartamento 301', en: 'Area and coefficient schedule for apartment 301' } },
              { id: 'b4s2', text: { es: 'Paz y salvo de cuotas de administración', en: 'Clearance certificate for administration fees' } },
              { id: 'b4s3', text: { es: 'Nombre, contacto y vigencia del administrador actual', en: 'Name, contact and current standing of the administrator' } },
              { id: 'b4s4', text: { es: 'Cuotas extraordinarias vigentes o aprobadas por la asamblea', en: 'Extraordinary fees in force or approved by the assembly' } }
            ] }
        ]
      },
      {
        id: 'b5',
        title: { es: 'Alcaldía de Engativá — representación legal de la copropiedad', en: 'Engativá local authority — legal representation of the condominium' },
        entity: { es: 'Alcaldía Local de Engativá', en: 'Engativá local authority' },
        lead: { es: 'Confirma que quien firme el paz y salvo tiene autoridad para hacerlo.',
                en: 'Confirms that whoever signs the clearance certificate actually has authority to do so.' },
        board: ['9'],
        blocks: [
          { type: 'letter',
            subject: { es: 'Solicitud de certificado de existencia y representación legal — Propiedad Horizontal',
                       en: 'Request for a certificate of existence and legal representation — Horizontal Property' },
            body: {
              es: 'Respetados señores:\n\nDe conformidad con la Ley 675 de 2001, solicito certificado de existencia y representación legal de la persona jurídica EDIFICIO SAN LUIS — PROPIEDAD HORIZONTAL, ubicada en la Avenida Carrera 70 No. 52-59 de esta ciudad, localidad de Engativá.\n\nLa solicitud tiene por objeto verificar la representación legal vigente de la copropiedad para efectos de un trámite de compraventa.\n\nCordialmente,',
              en: 'Dear Sirs,\n\nPursuant to Law 675 of 2001, I request a certificate of existence and legal representation for the legal entity EDIFICIO SAN LUIS — HORIZONTAL PROPERTY, located at Avenida Carrera 70 No. 52-59 in this city, Engativá locality.\n\nThe purpose of this request is to verify the current legal representation of the condominium for the purposes of a sale transaction.\n\nYours faithfully,' } },
          { type: 'why',
            text: { es: 'Confirma que quien firme el paz y salvo de administración tiene autoridad para hacerlo. Un paz y salvo firmado por alguien sin representación no sirve en la notaría.',
                    en: 'It confirms that whoever signs the administration clearance certificate has authority to do so. A certificate signed by someone without legal representation is worthless at the notary’s office.' } }
        ]
      },
      {
        id: 'b6',
        title: { es: 'Paz y salvo de impuesto predial', en: 'Property-tax clearance certificate' },
        entity: { es: 'Secretaría de Hacienda', en: 'Secretaría de Hacienda' },
        lead: { es: 'Se solicita en línea con el CHIP del predio.',
                en: 'Requested online using the property CHIP.' },
        board: ['7'],
        blocks: [
          { type: 'kv',
            title: { es: 'Datos para la solicitud', en: 'Data for the request' },
            rows: [
              { k: 'CHIP', v: 'AAA0060KHPA' },
              { k: { es: 'Matrícula', en: 'Registration' }, v: '50C-1211767' },
              { k: { es: 'Titular', en: 'Owner' }, v: 'Gloria Constanza Gómez Londoño — C.C. 51.646.323' }
            ] }
        ]
      },
      {
        id: 'b7',
        title: { es: 'Verificar el estado civil de la titular en 2005', en: 'Verify the owner’s marital status in 2005' },
        entity: { es: 'Vía escritura 2043 de 2005', en: 'Via deed 2043 of 2005' },
        lead: { es: 'Si había sociedad conyugal vigente al comprar, la venta puede requerir una firma adicional.',
                en: 'If a marital property regime was in force at the time of purchase, the sale may need an extra signature.' },
        board: ['10'],
        blocks: [
          { type: 'why',
            text: { es: 'La escritura 2043 declara el estado civil de la titular al momento de la compra. Ese dato decide si el apartamento entró a una sociedad conyugal y, por tanto, si hace falta la firma o autorización del cónyuge para vender. Es la razón por la que la copia de la escritura no puede esperar.',
                    en: 'Deed 2043 states the owner’s marital status at the time of purchase. That single fact decides whether the apartment entered a marital property regime and therefore whether a spouse’s signature or authorisation is needed to sell. It is why the copy of the deed cannot wait.' } },
          { type: 'note',
            text: { es: 'Depende de la tarea "Notaría 64 — copia de la escritura 2043 de 2005".',
                    en: 'Depends on the task "Notaría 64 — certified copy of deed 2043 of 2005".' } }
        ]
      },
      {
        id: 'b8',
        title: { es: 'Poder especial, si la titular no firma en persona', en: 'Special power of attorney, if the owner will not sign in person' },
        entity: { es: 'Notaría', en: 'Notary office' },
        lead: { es: 'Se otorga en notaría y debe describir el inmueble con las tres direcciones.',
                en: 'Granted at a notary office and must describe the property using all three addresses.' },
        board: ['11'],
        blocks: [
          { type: 'note',
            text: { es: 'El poder debe identificar el inmueble por matrícula 50C-1211767 y por las tres direcciones (folio, actual y catastral), igual que la promesa de compraventa.',
                    en: 'The power of attorney must identify the property by registration 50C-1211767 and by all three addresses (folio, current and cadastral), exactly as the promise-of-sale contract does.' } }
        ]
      },
      {
        id: 'b9',
        title: { es: 'Certificado de tradición nuevo, al momento de firmar', en: 'Fresh title certificate, at signing' },
        entity: { es: 'Superintendencia de Notariado y Registro', en: 'Superintendencia de Notariado y Registro' },
        lead: { es: 'El certificado tiene fecha de caducidad práctica. Se pide uno nuevo justo antes de escriturar.',
                en: 'The certificate has a practical shelf life. Request a fresh one just before signing the deed.' },
        board: ['13'],
        blocks: [
          { type: 'note',
            text: { es: 'El último es del 06-09-2026, turno 2026-50C-1-644189. No lo pidan de nuevo hasta que haya comprador y fecha de escrituración.',
                    en: 'The latest one is dated 06-09-2026, ref. 2026-50C-1-644189. Do not request another until there is a buyer and a signing date.' } }
        ]
      }
    ]
  },

  {
    id: 'impuestos', key: 'C',
    name:  { es: 'Vía C — Impuestos', en: 'Track C — Taxes' },
    title: { es: 'Hablar con el contador', en: 'Talk to the accountant' },
    lead:  { es: 'Debe ocurrir antes de fijar precio. Puede ser el rubro más grande de toda la operación.',
             en: 'This has to happen before setting a price. It may be the single biggest line item of the whole deal.' },
    tasks: [
      {
        id: 'c1',
        title: { es: 'Agendar la cita con el contador público', en: 'Book the appointment with the accountant' },
        entity: { es: 'Contador público', en: 'Certified accountant' },
        flag: { es: 'Antes de fijar precio', en: 'Before setting a price' },
        lead: { es: 'Llevar copia del certificado de tradición y de la escritura 2043 de 2005.',
                en: 'Take a copy of the title certificate and of deed 2043 of 2005.' },
        board: ['12'],
        blocks: [
          { type: 'kv',
            title: { es: 'Contexto que necesita el contador', en: 'Context the accountant needs' },
            rows: [
              { k: { es: 'Adquirido en', en: 'Acquired in' }, v: '2005' },
              { k: { es: 'Valor del acto registrado', en: 'Registered purchase value' }, v: '$47.000.000' },
              { k: { es: 'Venta estimada', en: 'Estimated sale' }, v: '~$300.000.000' }
            ] },
          { type: 'warn',
            text: { es: 'Este punto puede ser el rubro más grande de toda la operación. Resolverlo antes de fijar precio, no después.',
                    en: 'This can be the largest single cost of the entire transaction. Settle it before setting a price, not after.' } }
        ]
      },
      {
        id: 'c2',
        title: { es: 'Las ocho preguntas para el contador', en: 'The eight questions for the accountant' },
        entity: { es: 'Contador público', en: 'Certified accountant' },
        lead: { es: 'Marquen cada una a medida que quede resuelta y anoten la respuesta.',
                en: 'Tick each one off as it gets answered, and write the answer down.' },
        blocks: [
          { type: 'subtasks',
            title: { es: 'Preguntas', en: 'Questions' },
            items: [
              { id: 'c2s1', text: { es: '¿Cuál es el costo fiscal actualizado del inmueble aplicando el índice de ajuste de la DIAN? ¿Qué otros costos se pueden sumar (mejoras, gastos notariales de la compra)?',
                                    en: 'What is the updated tax basis of the property applying the DIAN adjustment index? What other costs can be added (improvements, notary costs of the original purchase)?' } },
              { id: 'c2s2', text: { es: '¿Cuál sería la ganancia ocasional estimada y el impuesto resultante?',
                                    en: 'What would the estimated capital gain be, and the resulting tax?' } },
              { id: 'c2s3', text: { es: '¿Aplica la exención por venta de casa o apartamento de habitación? ¿Cuáles son los topes vigentes este año y qué condiciones debe cumplir?',
                                    en: 'Does the exemption for the sale of a primary residence apply? What are this year’s caps and what conditions must be met?' } },
              { id: 'c2s4', text: { es: 'Si aplica: ¿es obligatorio depositar el producto de la venta en una cuenta AFC? ¿En qué plazo y con qué restricciones de retiro?',
                                    en: 'If it applies: is it compulsory to deposit the sale proceeds into an AFC account? Within what deadline, and with what withdrawal restrictions?' } },
              { id: 'c2s5', text: { es: '¿Cómo opera la retención en la fuente del 1% que practica el notario y cómo se cruza con el impuesto final?',
                                    en: 'How does the 1% withholding tax applied by the notary work, and how is it offset against the final tax?' } },
              { id: 'c2s6', text: { es: '¿Debe la titular declarar renta por este año a raíz de la venta, aunque no lo hiciera antes?',
                                    en: 'Must the owner file an income tax return this year because of the sale, even if she did not file before?' } },
              { id: 'c2s7', text: { es: '¿Hay alguna diferencia relevante si la venta se firma este año fiscal o el siguiente?',
                                    en: 'Is there any material difference between signing the sale this tax year or the next?' } },
              { id: 'c2s8', text: { es: '¿Qué documentación debe conservar la titular como soporte?',
                                    en: 'What documentation must the owner keep as supporting evidence?' } }
            ] }
        ]
      }
    ]
  },

  {
    id: 'agencias', key: 'D',
    name:  { es: 'Inmobiliarias', en: 'Estate agencies' },
    title: { es: 'Evaluar inmobiliarias', en: 'Vetting the agencies' },
    lead:  { es: 'Solo cuando el avalúo y los papeles estén listos. Usar la misma tarjeta con cada agencia y no mencionar el resultado del avalúo antes de que den su cifra.',
             en: 'Only once the appraisal and the paperwork are ready. Use the same scorecard with every agency, and do not mention the appraisal figure before they give you theirs.' },
    tasks: [
      {
        id: 'd1',
        title: { es: 'Verificación previa de cada agencia', en: 'Pre-checks on every agency' },
        entity: { es: 'Cámara de Comercio de Bogotá', en: 'Bogotá Chamber of Commerce' },
        lead: { es: 'Cinco comprobaciones antes de sentarse a hablar.',
                en: 'Five checks before you sit down to talk.' },
        blocks: [
          { type: 'subtasks',
            title: { es: 'Comprobaciones', en: 'Checks' },
            items: [
              { id: 'd1s1', text: { es: 'Certificado de existencia y representación legal (Cámara de Comercio de Bogotá)',
                                    en: 'Certificate of existence and legal representation (Bogotá Chamber of Commerce)' } },
              { id: 'd1s2', text: { es: 'Matrícula mercantil vigente', en: 'Commercial registration current and valid' } },
              { id: 'd1s3', text: { es: 'Objeto social incluye actividad inmobiliaria', en: 'Corporate purpose includes real-estate activity' } },
              { id: 'd1s4', text: { es: 'Cédula del asesor + carta de autorización firmada por el representante legal',
                                    en: 'Agent’s ID + letter of authorisation signed by the legal representative' } },
              { id: 'd1s5', text: { es: '¿Piden documentación de identidad al comprador? (control de lavado de activos — si no piden nada, mala señal)',
                                    en: 'Do they ask the buyer for identity documents? (anti-money-laundering control — asking for nothing is a bad sign)' } }
            ] }
        ]
      },
      {
        id: 'd2',
        title: { es: 'Las ocho preguntas de la tarjeta', en: 'The eight scorecard questions' },
        entity: { es: 'Cada agencia', en: 'Each agency' },
        lead: { es: 'Las mismas ocho preguntas, en el mismo orden, a cada agencia.',
                en: 'The same eight questions, in the same order, to every agency.' },
        blocks: [
          { type: 'qtable',
            head: { q: { es: 'Pregunta', en: 'Question' }, r: { es: 'Qué revela', en: 'What it reveals' } },
            rows: [
              { n: 1, q: { es: '¿Cuál es su precio sugerido?', en: 'What is your suggested price?' },
                     r: { es: 'Anótelo antes de mostrar el avalúo', en: 'Write it down before you show them the appraisal' } },
              { n: 2, q: { es: 'Deme tres comparables en Normandía con precio de cierre y fecha', en: 'Give me three comparables in Normandía with closing price and date' },
                     r: { es: 'Si solo dan precios de oferta, están adivinando', en: 'If all they give is asking prices, they are guessing' } },
              { n: 3, q: { es: '¿Cuánto tiempo estima para vender a ese precio?', en: 'How long do you estimate it takes to sell at that price?' },
                     r: { es: 'El que promete rapidez y precio alto a la vez, miente', en: 'Anyone promising speed and a high price at once is lying' } },
              { n: 4, q: { es: '¿Qué hace si a los 45 días no hay ofertas?', en: 'What do you do if there are no offers after 45 days?' },
                     r: { es: 'Debe ofrecer un punto de revisión, no optimismo', en: 'They should offer a review point, not optimism' } },
              { n: 5, q: { es: '¿En qué portales publica y con qué fotografía?', en: 'Which portals do you list on, and with what photography?' },
                     r: { es: 'Debe incluir Fincaraíz, Metrocuadrado, Ciencuadras', en: 'Must include Fincaraíz, Metrocuadrado, Ciencuadras' } },
              { n: 6, q: { es: '¿Cuál es su comisión y en qué momento se causa?', en: 'What is your commission and when does it become payable?' },
                     r: { es: 'Debe ser al escriturar y recibir el dinero', en: 'It must be on signing the deed and receiving the money' } },
              { n: 7, q: { es: '¿Exige exclusividad? ¿Por cuánto tiempo?', en: 'Do you require exclusivity? For how long?' },
                     r: { es: 'Máximo 3 meses, con cláusula de salida', en: 'Three months maximum, with an exit clause' } },
              { n: 8, q: { es: '¿Cobra algo por anticipado?', en: 'Do you charge anything up front?' },
                     r: { es: 'Cualquier cobro anticipado = retirarse', en: 'Any up-front charge = walk away' } }
            ] }
        ]
      },
      {
        id: 'd3',
        title: { es: 'Comparar las cifras y aplicar la señal de alarma', en: 'Compare the numbers and apply the red-flag test' },
        entity: { es: 'Familia', en: 'Family' },
        lead: { es: 'La cifra más alta casi nunca es la mejor noticia.',
                en: 'The highest figure is almost never the good news it looks like.' },
        blocks: [
          { type: 'warn',
            title: { es: 'Señal de alarma principal', en: 'The main red flag' },
            text: { es: 'Si tres agencias dan cifras parecidas y una da una cifra muy superior, esa última es la menos creíble — no encontró valor que las otras no vieron.',
                    en: 'If three agencies give similar figures and one gives a much higher one, that last one is the least credible — it has not found value the others missed.' } }
        ]
      }
    ]
  },

  {
    id: 'contrato', key: 'E',
    name:  { es: 'Contrato', en: 'Contract' },
    title: { es: 'Cláusulas innegociables', en: 'Non-negotiable clauses' },
    lead:  { es: 'Del contrato de corretaje. Si una agencia se niega a alguna de estas, es la agencia equivocada.',
             en: 'For the brokerage agreement. If an agency refuses any one of these, it is the wrong agency.' },
    tasks: [
      {
        id: 'e1',
        title: { es: 'Las ocho cláusulas del contrato de corretaje', en: 'The eight brokerage-agreement clauses' },
        entity: { es: 'Contrato de corretaje', en: 'Brokerage agreement' },
        lead: { es: 'Verificar una por una en el borrador antes de firmar.',
                en: 'Check them one by one in the draft before signing.' },
        blocks: [
          { type: 'subtasks',
            title: { es: 'Cláusulas', en: 'Clauses' },
            items: [
              { id: 'e1s1', text: { es: 'Comisión se causa al escriturar y recibir el pago, no al firmar la promesa',
                                    en: 'Commission becomes payable on signing the deed and receiving payment, not on signing the promise' } },
              { id: 'e1s2', text: { es: 'Cero pagos anticipados (publicidad, fotografía, portales)',
                                    en: 'Zero up-front payments (advertising, photography, portals)' } },
              { id: 'e1s3', text: { es: 'Exclusividad máximo 3 meses, con revisión y derecho de salida',
                                    en: 'Exclusivity of three months maximum, with a review point and a right to exit' } },
              { id: 'e1s4', text: { es: 'Excepción para compradores presentados por la familia',
                                    en: 'Carve-out for buyers introduced by the family' } },
              { id: 'e1s5', text: { es: 'Cláusula de cola limitada a 60–90 días y con lista escrita de prospectos entregada al terminar',
                                    en: 'Tail clause limited to 60–90 days, with a written list of prospects handed over at the end' } },
              { id: 'e1s6', text: { es: 'El precio de lista lo fija el propietario; ninguna reducción sin autorización escrita',
                                    en: 'The list price is set by the owner; no reduction without written authorisation' } },
              { id: 'e1s7', text: { es: 'Registro firmado de entrega de llaves y bitácora de visitas con identificación',
                                    en: 'Signed record of key handover and a visitor log with identification' } },
              { id: 'e1s8', text: { es: 'El dinero de la venta NUNCA pasa por la cuenta de la inmobiliaria',
                                    en: 'The sale money NEVER passes through the agency’s account' } }
            ] }
        ]
      },
      {
        id: 'e2',
        title: { es: 'Revisión de la promesa de compraventa por un abogado inmobiliario', en: 'Have a real-estate lawyer review the promise of sale' },
        entity: { es: 'Abogado inmobiliario', en: 'Real-estate lawyer' },
        flag: { es: 'Antes de firmar', en: 'Before signing' },
        lead: { es: 'Esta carpeta es una guía de preparación, no asesoría legal. La promesa la revisa un abogado.',
                en: 'This pack is a preparation guide, not legal advice. The promise contract gets reviewed by a lawyer.' },
        blocks: [
          { type: 'note',
            text: { es: 'La promesa debe describir el inmueble con la matrícula 50C-1211767 y las tres direcciones (folio, actual y catastral), porque todas corresponden al mismo apartamento.',
                    en: 'The promise must describe the property with registration 50C-1211767 and all three addresses (folio, current and cadastral), because they all refer to the same apartment.' } }
        ]
      }
    ]
  }
];

/* --------------------------------------------------------------------------
   Section 6 — Tracking board
   -------------------------------------------------------------------------- */

const BOARD = {
  title: { es: 'Tablero de seguimiento', en: 'Tracking board' },
  lead:  { es: 'Los trece trámites con su radicado y su estado. Se actualiza solo cuando escriben en el detalle de cada tarea, y al revés.',
           en: 'The thirteen procedures with their reference number and status. It updates when you fill in a task’s details, and the other way round.' },
  rows: [
    { id: '1',  task: { es: 'Avalúo comercial RAA', en: 'RAA commercial appraisal' },            entity: { es: 'Perito RAA', en: 'RAA appraiser' },                 link: 'a1' },
    { id: '2',  task: { es: 'Consulta catastral (CHIP)', en: 'Cadastral lookup (CHIP)' },        entity: { es: 'Catastro Bogotá', en: 'Catastro Bogotá' },          link: 'a2' },
    { id: '3',  task: { es: 'Cuadro de áreas y coeficientes', en: 'Area and coefficient schedule' }, entity: { es: 'Administración', en: 'Building management' },   link: 'b4' },
    { id: '4',  task: { es: 'Copia escritura 2043/2005', en: 'Copy of deed 2043/2005' },         entity: { es: 'Notaría 64', en: 'Notaría 64' },                    link: 'b2' },
    { id: '5',  task: { es: 'Copia reglamento P.H.', en: 'Copy of condominium bylaws' },         entity: { es: 'Notaría 19', en: 'Notaría 19' },                    link: 'b3' },
    { id: '6',  task: { es: 'Paz y salvo valorización', en: 'Betterment-levy clearance' },       entity: { es: 'IDU', en: 'IDU' },                                  link: 'b1',
      defaultStatus: 'tramite', note: { es: 'Iniciado — sin generar', en: 'Started — not yet issued' } },
    { id: '7',  task: { es: 'Paz y salvo predial', en: 'Property-tax clearance' },               entity: { es: 'Sec. Hacienda', en: 'Sec. Hacienda' },              link: 'b6' },
    { id: '8',  task: { es: 'Paz y salvo administración', en: 'Administration-fee clearance' },  entity: { es: 'Administración', en: 'Building management' },       link: 'b4' },
    { id: '9',  task: { es: 'Cert. representación legal P.H.', en: 'Cert. of legal representation' }, entity: { es: 'Alcaldía Engativá', en: 'Engativá authority' }, link: 'b5' },
    { id: '10', task: { es: 'Verificar estado civil 2005', en: 'Verify 2005 marital status' },   entity: { es: 'Vía escritura 2043', en: 'Via deed 2043' },         link: 'b7' },
    { id: '11', task: { es: 'Poder especial (si aplica)', en: 'Power of attorney (if needed)' }, entity: { es: 'Notaría', en: 'Notary office' },                    link: 'b8' },
    { id: '12', task: { es: 'Consulta contador', en: 'Accountant consultation' },                entity: { es: 'Contador público', en: 'Certified accountant' },    link: 'c1' },
    { id: '13', task: { es: 'Certificado tradición nuevo', en: 'Fresh title certificate' },      entity: { es: 'SNR', en: 'SNR' },                                  link: 'b9',
      note: { es: 'Al momento de firmar', en: 'At signing' } }
  ]
};

/* --------------------------------------------------------------------------
   Section 7 — Market reference
   -------------------------------------------------------------------------- */

const MARKET = {
  title: { es: 'Referencia de mercado', en: 'Market reference' },
  tag:   { es: 'Orientativa — no es un avalúo', en: 'Indicative — not an appraisal' },
  lead:  { es: 'Precios de oferta en portales para Normandía:',
           en: 'Asking prices on property portals for Normandía:' },
  offers: [
    { k: { es: 'Promedio 3 habitaciones', en: 'Average, 3 bedrooms' }, v: '~$480.000.000', sub: '~$6,0 M/m²' },
    { k: { es: 'Promedio estrato 4', en: 'Average, stratum 4' },       v: '~$540.000.000', sub: '~$6,5 M/m²' },
    { k: { es: 'Rango del sector', en: 'Range for the area' },         v: '$5 – $7 M/m²',  sub: null }
  ],
  adjust: { es: 'Ajuste a la baja por edificio de 1989, tercer piso sin ascensor y sin parqueadero confirmado: rango realista $4,2 – $5,5 millones/m².',
            en: 'Adjusted downwards for a 1989 building, third floor with no lift and no confirmed parking space: realistic range $4.2 – $5.5 million/m².' },
  tableLead: { es: 'Si el área privada resulta ser ~62 m²:', en: 'If the private area turns out to be ~62 m²:' },
  table: [
    { m2: '$4.500.000', total: '$279.000.000' },
    { m2: '$5.000.000', total: '$310.000.000' },
    { m2: '$5.500.000', total: '$341.000.000' }
  ],
  tableHead: { m2: { es: '$/m²', en: '$/m²' }, total: { es: 'Valor implícito', en: 'Implied value' } },
  expectation: { es: 'Expectativa realista de venta: $270 – $330 millones.\nPrecio de lista sugerido: $340 – $360 millones.',
                 en: 'Realistic sale expectation: $270 – $330 million.\nSuggested list price: $340 – $360 million.' },
  notes: [
    { es: 'El avalúo RAA reemplaza esta tabla. Sirve únicamente para juzgar si la cifra de una inmobiliaria es plausible.',
      en: 'The RAA appraisal replaces this table. It exists only to judge whether an agency’s figure is plausible.' },
    { es: 'El avalúo catastral NO sirve como referencia de precio — en Bogotá suele estar entre 40% y 60% por debajo del valor comercial.',
      en: 'The cadastral value is NOT a price reference — in Bogotá it usually sits 40% to 60% below market value.' }
  ]
};

const FOOTER = {
  disclaimer: { es: 'Este documento es una guía de preparación, no asesoría legal, contable ni de avalúo. La promesa de compraventa debe ser revisada por un abogado inmobiliario antes de firmar.',
                en: 'This document is a preparation guide, not legal, accounting or valuation advice. The promise-of-sale contract must be reviewed by a real-estate lawyer before signing.' },
  meta: { es: 'Matrícula 50C-1211767 · Certificado de tradición del 06-09-2026 · Turno 2026-50C-1-644189',
          en: 'Registration 50C-1211767 · Title certificate of 06-09-2026 · Ref. 2026-50C-1-644189' }
};
