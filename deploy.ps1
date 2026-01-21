# Script de despliegue automatizado para Widget A
param(
    [string]$Environment = "production"
)

Write-Host "🚀 Iniciando despliegue del Widget A..." -ForegroundColor Green

try {
    # Verificar que Netlify CLI esté instalado
    if (!(Get-Command netlify -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Netlify CLI no está instalado. Instalando..." -ForegroundColor Yellow
        npm install -g netlify-cli
    }

    # Instalar dependencias
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Blue
    npm ci

    # Usar configuración de producción
    Write-Host "⚙️ Configurando para producción..." -ForegroundColor Blue
    Copy-Item "federation.config.multirepo.js" "federation.config.js" -Force

    # Build del proyecto
    Write-Host "🔨 Construyendo proyecto..." -ForegroundColor Blue
    npm run build:multirepo

    # Verificar que el build fue exitoso
    if (!(Test-Path "dist/mf-widget-a/browser/remoteEntry.json")) {
        throw "Build falló - no se encontró remoteEntry.json"
    }

    # Deploy a Netlify
    Write-Host "🌐 Desplegando a Netlify..." -ForegroundColor Blue

    if ($Environment -eq "production") {
        netlify deploy --prod --dir=dist/mf-widget-a/browser --site=widget-a-multirepo
    } else {
        netlify deploy --dir=dist/mf-widget-a/browser --site=widget-a-multirepo
    }

    Write-Host "✅ Despliegue completado exitosamente!" -ForegroundColor Green
    Write-Host "🔗 URL: https://widget-a-multirepo.netlify.app" -ForegroundColor Cyan

    # Restaurar configuración local
    git checkout federation.config.js 2>$null

} catch {
    Write-Host "❌ Error durante el despliegue: $_" -ForegroundColor Red
    git checkout federation.config.js 2>$null
    exit 1
}
