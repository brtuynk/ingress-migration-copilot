class IngressMigrationCopilot < Formula
  desc "CLI for migrating ingress-nginx manifests to Gateway API"
  homepage "https://github.com/brtuynk/ingress-migration-copilot"
  url "https://github.com/brtuynk/ingress-migration-copilot/archive/refs/tags/v0.1.4.tar.gz"
  sha256 "4c45a68d56e0d03da44be4421820df7f118e202495c34f82a50be27c60fe18fe"
  license "Apache-2.0"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args(prefix: libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match "Migration Copilot CLI", shell_output("#{bin}/mig --help")
  end
end
