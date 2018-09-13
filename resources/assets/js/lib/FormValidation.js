module.exports =  {

  verifyFormField(value, verificationList) {
    for (let i = 0; i < verificationList.length; ++i) {
      if (!this.verification(verificationList[i], value))
        return false
    }
    return true
  },

  verification(verificationName, value) {
    switch (verificationName) {
      case 'required':
        return this.required(value)
        break
      case 'alpha':
        return this.alpha(value)
        break
      case 'numeric':
        return this.numeric(value)
        break
      case 'numericNotNull':
        return this.numericNotNull(value)
        break
      case 'alphaNum':
        return this.alphaNum(value)
        break
      case 'emailUpem':
        return this.emailUpem(value)
        break
      case 'date':
        return this.date(value)
        break
      case 'dateSup':
        return this.dateSup(value)
        break
      case 'file':
        return this.file(value)
        break
      case 'carte':
        return this.carte(value)
        break
      case 'telephone':
        return this.telephone(value)
      default:
        break

    }
  },

  /* Vérifie qu'un champ est rempli */
  required(value) {
    if (value) {
      return (value.toString().trim().length)
    }
    return false
  },

  /* Vérifie qu'un champ est un alpha (texte et espaces) */
  alpha(value) {
    //const regex = RegExp('^([a-zA-Z])+([a-zA-Z\,\.-\s]+)')
    const regex = RegExp('[^"\r\n]*')
    return (regex.test(value.toString().trim()))
  },

  /* Vérifie qu'un champ est un alphaNum (texte et chiffres et espaces) */
  alphaNum(value) {
    const regex = RegExp('^([a-zA-Z0-9_\.-\s]+)')
    return (regex.test(value.toString().trim()))
  },

  /* Vérifie qu'un champ est un email upem (pas étudiant) prenom.nom@u-pem.fr */
  emailUpem(value) {
    const regex = RegExp('^([a-z]+)\.([a-z]+)@(?:u-pem.fr)$')
    return (regex.test(value.toString().trim()))
  },

  /* Crée une date à partir d'un string */
  createDate(string) {
    const yr    = parseInt(string.substring(0,4))
    const mon  = parseInt(string.substring(5,7))
    const d   = parseInt(string.substring(8,10))
    return new Date(yr, mon-1, d)
  },

  /* Vérifie qu'un champ est une date */
  date(value) {
    const regex = RegExp('^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$')
    if (regex.test(value.toString().trim())) {
      const formDate = this.createDate(value.toString().trim())
      const currentDate = new Date()

      return (formDate > currentDate)
    }
    return false
  },

  /* Vérifie qu'un champ est une date supérieure à la date fournie
   * value[0] est la date début
   * value[1] est la date fin
   */
  dateSup(value) {
    if (this.date(value[0]) && this.date(value[1])) {
      const date1 = this.createDate(value[0].toString().trim())
      const date2 = this.createDate(value[1].toString().trim())
      return (date2 > date1)
    }
    return false
  },

  /* Vérifie qu'un champ est un nombre positif */
  numeric(value) {
    const regex = RegExp('^([0-9]+)')
    return (regex.test(value.toString().trim()))
  },

  /* Vérifie qu'un champ est un numéro à 10 chiffres */
  telephone(value) {
    return (this.numeric(value) && value.toString().trim().length === 10)
  },

  /* Vérifie qu'un champ est un nombre positif non nul */
  numericNotNull(value) {
    const regex = RegExp('^[1-9][0-9]*')
    return (regex.test(value.toString().trim()))
  },

  /* Vérifie qu'un champ est un numéro de carte étudiante */
  carte(value) {
    return (this.numeric(value))
  },

  /* Vérifie qu'un fichier est de type pdf, jpg, jpeg, png ou tiff */
  file(value) {
    const regexPDF = RegExp('^.+(\.pdf)$');
    const regexJPG = RegExp('^.+(\.jpg)$');
    const regexJPEG = RegExp('^.+(\.jpeg)$');
    const regexPNG = RegExp('^.+(\.png)$');
    const regexTIFF = RegExp('^.+(\.tiff)$');
    const string = value.toString().trim()
    return (regexPDF.test(string) || regexJPG.test(string) || regexJPEG.test(string) || regexPNG.test(string) || regexTIFF.test(string))
  }

}
