import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../../user/user.service";
import { User } from "../../user/user.entity";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID:
        configService.get<string>("GOOGLE_CLIENT_ID") || "dummy-client-id",
      clientSecret:
        configService.get<string>("GOOGLE_CLIENT_SECRET") ||
        "dummy-client-secret",
      callbackURL:
        configService.get<string>("GOOGLE_CALLBACK_URL") ||
        "http://localhost:3000/auth/google/callback",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails } = profile;

    let user = await this.userService.findByGoogleId(id);

    if (!user) {
      // Check if user exists with same email
      user = await this.userService.findByEmail(emails[0].value);

      if (user) {
        // Link Google account to existing user
        user.googleId = id;
        await this.userService.updateUser(user.id_usuario, { googleId: id });
      } else {
        // Create new user
        const userData: Partial<User> = {
          email_usuario: emails[0].value,
          nome_usuario: `${name.givenName} ${name.familyName}`,
          googleId: id,
        };
        user = await this.userService.createUser(userData);
      }
    }

    done(null, user);
  }
}
