import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import { UserRole } from '../users/schemas/user.schema';
import { ListingStatus } from './schemas/listing.schema';
import { Types } from 'mongoose';

interface JwtUser {
  sub: string;
  role: UserRole;
}

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  // GET /listings — Protected: role-based filtering (clients=own only, contractors=open only)
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('status') status?: ListingStatus,
    @Query('category') category?: string,
    @Query('location') location?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @CurrentUser() user?: JwtUser,
  ) {
    return this.listingsService.findAll(
      { status, category, location, search, page, limit },
      user?.sub,
      user?.role as UserRole,
    );
  }

  // GET /listings/my — Get own listings (client)
  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  getMyListings(
    @CurrentUser() user: JwtUser,
    @Query('status') status?: ListingStatus,
  ) {
    return this.listingsService.findByClient(user.sub, status);
  }

  // GET /listings/:id — Protected: ownership/access check, 403 if unauthorized
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser() user: JwtUser,
  ) {
    return this.listingsService.findByIdWithAccess(
      id.toString(),
      user.sub,
      user.role as UserRole,
    );
  }

  // POST /listings — Client only
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createListingDto: CreateListingDto, @CurrentUser() user: JwtUser) {
    return this.listingsService.create(createListingDto, user.sub);
  }

  // PATCH /listings/:id — Owner or Admin
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateListingDto: UpdateListingDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.listingsService.update(id.toString(), updateListingDto, user.sub, user.role);
  }

  // DELETE /listings/:id — Owner or Admin
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser() user: JwtUser,
  ) {
    return this.listingsService.delete(id.toString(), user.sub, user.role);
  }
}
