-- Row Level SecurityMessage
alter table "public"."characters"
  enable row level security;

create policy "Users can view their own character." on "public"."characters"
  for select using (auth.uid() = user_id);

create policy "Users can insert their own character." on "public"."characters"
  for insert with check (auth.uid() = user_id);

create policy "Users can update own character." on "public"."characters"
  for update using (auth.uid() = user_id);

alter table "public"."chats"
  enable row level security;

create policy "Users can view their own chat." on "public"."chats"
  for select using (auth.uid() = user_id);

create policy "Users can insert their own chat." on "public"."chats"
  for insert with check (auth.uid() = user_id);

create policy "Users can update own chat." on "public"."chats"
  for update using (auth.uid() = user_id);

alter table "public"."messages"
  enable row level security;

create policy "Users can view their own message." on "public"."messages"
  for select using (auth.uid() = user_id);

create policy "Users can insert their own message." on "public"."messages"
  for insert with check (auth.uid() = user_id);

create policy "Users can update own message." on "public"."messages"
  for update using (auth.uid() = user_id);

alter table profiles
  enable row level security;

create policy "Users can view their own profile." on profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);
