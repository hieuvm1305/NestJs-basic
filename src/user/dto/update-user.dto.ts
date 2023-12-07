export class UpdateUserDto {
  readonly username: string;
  readonly email: string;
  readonly bio?: string;
  readonly image?: string;
  readonly lastName: string;
  readonly is_superuser: boolean;
}
