-- Row Level SecurityMessage
alter table "public"."Character"
  enable row level security;

create policy "Users can view their own character." on "public"."Character"
  for select using (auth.uid() = user_id);

create policy "Users can insert their own character." on "public"."Character"
  for insert with check (auth.uid() = user_id);

create policy "Users can update own character." on "public"."Character"
  for update using (auth.uid() = user_id);

alter table "public"."Chat"
  enable row level security;

create policy "Users can view their own chat." on "public"."Chat"
  for select using (auth.uid() = user_id);

create policy "Users can insert their own chat." on "public"."Chat"
  for insert with check (auth.uid() = user_id);

create policy "Users can update own chat." on "public"."Chat"
  for update using (auth.uid() = user_id);

alter table "public"."Message"
  enable row level security;

create policy "Users can view their own message." on "public"."Message"
  for select using (auth.uid() = user_id);

create policy "Users can insert their own message." on "public"."Message"
  for insert with check (auth.uid() = user_id);

create policy "Users can update own message." on "public"."Message"
  for update using (auth.uid() = user_id);

alter table profiles
  enable row level security;

create policy "Users can view their own profile." on profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);
