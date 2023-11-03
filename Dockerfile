# İlk aşamada Node.js tabanlı bir imajı kullanın
FROM node:14

# Uygulamanızın çalışacağı bir çalışma dizini oluşturun
WORKDIR /app

# Uygulama bağımlılıklarını kopyalayın ve yükleyin
COPY package*.json ./
RUN npm install

# Uygulama kaynak kodunu kopyalayın
COPY . .

# Uygulamayı başlatın
CMD ["npm", "start"]

# CMD ["npm", "run", "start"]