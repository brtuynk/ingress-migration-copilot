class IngressMigrationCopilot < Formula
  desc "CLI for migrating ingress-nginx manifests to Gateway API"
  homepage "https://github.com/brtuynk/ingress-migration-copilot.git"
  url "https://registry.npmjs.org/ingress-migration-copilot/-/ingress-migration-copilot-0.1.0.tgz"
  sha256 "034e301520521953ccdf81c71f22be51fc1c52c1957134588afe716e19694eec"
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
