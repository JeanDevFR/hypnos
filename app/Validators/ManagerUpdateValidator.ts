import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ManagerUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lastname: schema.string({ trim: true }, [rules.alpha()]),
    firstname: schema.string({ trim: true }, [rules.alpha()]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.ctx.params.id } }),
    ]),
    password: schema.string.optional({}, [rules.confirmed()]),
  })

  public messages = {
    'lastname.required': 'Le nom est obligatoire',
    'lastname.alpha': 'Le nom ne peut contenir que des lettres',
    'firstname.required': 'Le prénom est obligatoire',
    'firstname.alpha': 'Le prénom ne peut contenir que des lettres',
    'email.required': "L'adresse email est obligatoire",
    'email.email': "L'adresse email est incorrecte",
    'email.unique': "L'adresse email n'est pas disponible",
    'password.required': 'Le mot de passe est obligatoire',
    'confirmed': 'Les mots de passe ne correspondent pas',
  }
}
